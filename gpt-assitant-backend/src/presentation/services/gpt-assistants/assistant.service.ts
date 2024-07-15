import {
  ClientAssistantDto,
  CreateAssistantDto,
} from '@domain/dtos/gpt-assistants'
import { ClientUserDto } from '@domain/dtos/user'
import { RequestError } from '@domain/errors'
import { AssistantMapper } from '@domain/mappers/gpt-assistants'
import { AssistantRepositoryImpl } from '@infrastructure/repositories/gpt-assistants'
import { LoggerPlugin, OpenAiClientPlugin } from '@config/plugins'
import { PaginationDto } from '@/domain/dtos/shared'

export class AssistantService {
  constructor(
    private readonly client: OpenAiClientPlugin,
    private readonly assistantRepository: AssistantRepositoryImpl,
    private readonly logger: LoggerPlugin = LoggerPlugin.instance,
    private readonly service: string = 'assistant-service'
  ) {}

  async createAssistant(
    assistantDto: CreateAssistantDto,
    clientUserDto: ClientUserDto
  ): Promise<{ assistant: ClientAssistantDto }> {
    try {
      const response = await this.client.assistants.create(assistantDto)
      if (!response)
        throw RequestError.internalServerError('Error creating assistant')

      const openaiId = response as string
      const assistantEntity = AssistantMapper.toEntity(
        assistantDto,
        openaiId,
        clientUserDto.id
      )
      const createdAssistant = await this.assistantRepository.create({
        assistantEntity,
      })
      if (!createdAssistant)
        throw RequestError.internalServerError(
          'Error saving assistant in datasource'
        )

      const clientAssistantDto =
        AssistantMapper.toClientAssistantDto(createdAssistant)

      return { assistant: clientAssistantDto }
    } catch (error) {
      let stack = ''
      if (error instanceof Error) {
        stack = error.stack ?? ''
      }
      this.logger.error(`${error}`, this.service, {
        error: stack,
        assistantDto,
        clientUserDto,
      })
      throw error
    }
  }

  async getAssistantsList(
    pagination: PaginationDto,
    clientUserDto: ClientUserDto
  ): Promise<{ list: ClientAssistantDto[]; pagination: PaginationDto }> {
    const response = await this.assistantRepository.findByUserId({
      userId: clientUserDto.id,
      pagination,
    })

    if (!response)
      throw RequestError.badRequest('Assistants not found for this user')

    const { assistants: assistantsList, pagination: assistantPagination } =
      response

    const clientAssistantDtoList = assistantsList.map((assistantEntity) =>
      AssistantMapper.toClientAssistantDto(assistantEntity)
    )

    return { list: clientAssistantDtoList, pagination: assistantPagination }
  }

  async getAssistantById(
    assistantId: string,
    clientUserDto: ClientUserDto
  ): Promise<{ assistant: ClientAssistantDto }> {
    const assistantEntity = await this.assistantRepository.findById({
      assistantId,
    })
    if (!assistantEntity)
      throw RequestError.badRequest('Assistant not found for this user')
    if (assistantEntity.userId !== clientUserDto.id)
      throw RequestError.forbidden('Assistant not found for this user')

    const clientAssistantDto =
      AssistantMapper.toClientAssistantDto(assistantEntity)

    return { assistant: clientAssistantDto }
  }

  async updateAssistantById(
    assistantId: string,
    assistantDto: CreateAssistantDto,
    clientUserDto: ClientUserDto
  ): Promise<{ assistant: ClientAssistantDto }> {
    let metadata = {}
    metadata = { ...metadata, assistantId, assistantDto, clientUserDto }
    // Check if assistant exists
    const oldAssistantEntity = await this.assistantRepository.findById({
      assistantId,
    })
    metadata = { ...metadata, oldAssistantEntity }
    if (!oldAssistantEntity) {
      this.logger.http(
        "Rejected request to update assistant that doesn't exist",
        this.service,
        metadata
      )
      throw RequestError.badRequest('Assistant not found for this user')
    }
    if (oldAssistantEntity.userId !== clientUserDto.id) {
      this.logger.http(
        "Rejected request to update assistant that doesn't belong to user",
        this.service,
        metadata
      )
      throw RequestError.forbidden('Assistant not found for this user')
    }

    const newAssistantEntity = AssistantMapper.toEntity(
      assistantDto,
      oldAssistantEntity.openaiId,
      oldAssistantEntity.userId,
      oldAssistantEntity.id
    )
    metadata = { ...metadata, newAssistantEntity }
    // Update assistant in OpenAI
    const updatedAssistant = await this.client.assistants.update(
      assistantDto,
      oldAssistantEntity.openaiId
    )
    if (!updatedAssistant) {
      this.logger.error(
        'Error updating assistant in OpenAI',
        this.service,
        metadata
      )
      throw RequestError.internalServerError('Error updating assistant')
    }

    // Update assistant in datasource
    const updatedAssistantEntity = await this.assistantRepository.update({
      assistantEntity: newAssistantEntity,
    })
    metadata = { ...metadata, updatedAssistantEntity }
    if (!updatedAssistantEntity) {
      this.logger.error(
        'Error updating assistant in datasource',
        this.service,
        metadata
      )
      throw RequestError.internalServerError('Error updating assistant')
    }

    const clientAssistantDto = AssistantMapper.toClientAssistantDto(
      updatedAssistantEntity
    )

    return { assistant: clientAssistantDto }
  }

  async deleteAssistantById(
    assistantId: string,
    clientUserDto: ClientUserDto
  ): Promise<void> {
    let metadata = {}
    metadata = { ...metadata, assistantId, clientUserDto }
    // Check if assistant exists
    const assistantEntity = await this.assistantRepository.findById({
      assistantId,
    })
    metadata = { ...metadata, assistantEntity }
    if (!assistantEntity) {
      this.logger.http(
        'Rejected request to delete assistant that does not exist',
        this.service,
        metadata
      )
      throw RequestError.badRequest('Assistant not found')
    }
    if (assistantEntity.userId !== clientUserDto.id) {
      this.logger.http(
        'Rejected request to delete assistant that does not belong to user',
        this.service,
        metadata
      )
      throw RequestError.forbidden('Assistant not found')
    }

    // Delete assistant in OpenAI
    const deletedAssistant = await this.client.assistants.delete(
      assistantEntity.openaiId
    )
    metadata = { ...metadata, deletedAssistant }
    if (!deletedAssistant) {
      this.logger.error(
        'Error deleting assistant in OpenAI',
        this.service,
        metadata
      )
      throw RequestError.internalServerError('Error deleting assistant')
    }

    // Delete assistant in datasource
    const deletedAssistantEntity = await this.assistantRepository.delete({
      assistantId,
    })
    metadata = { ...metadata, deletedAssistantEntity }
    if (!deletedAssistantEntity) {
      this.logger.error(
        'Error deleting assistant in datasource',
        this.service,
        metadata
      )
      throw RequestError.internalServerError('Error deleting assistant')
    }
  }
}

import {
  ClientAssistantDto,
  CreateAssistantDto,
} from '@domain/dtos/gpt-assistants'
import { ClientUserDto } from '@domain/dtos/user'
import { RequestError } from '@domain/errors'
import { AssistantMapper } from '@domain/mappers/gpt-assistants'
import { AssistantRepositoryImpl } from '@infrastructure/repositories/gpt-assistants'
import { LoggerPlugin, OpenAiClientPlugin, UUID } from '@config/plugins'

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
  ): Promise<ClientAssistantDto> {
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
      const isCreated = await this.assistantRepository.create(assistantEntity)
      if (!isCreated)
        throw RequestError.internalServerError(
          'Error saving assistant in datasource'
        )

      const clientAssistantDto =
        AssistantMapper.toClientAssistantDto(assistantEntity)

      return clientAssistantDto
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

  async getAssistantsList() {}
}

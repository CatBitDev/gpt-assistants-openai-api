import { ClientAssistantDto, CreateAssistantDto } from '@/domain/dtos'
import { AssistantEntity } from '@/domain/entities'
import { RequestError } from '@/domain/errors'
import { AssistantMapper } from '@/domain/mappers'
import { AssistantRepositoryImpl } from '@/infrastructure/repositories'
import { OpenAiClientPlugin, UUID } from '@config/plugins'

export class AssistantService {
  constructor(
    private readonly client: OpenAiClientPlugin,
    private readonly assistantRepository: AssistantRepositoryImpl
  ) {}

  async createAssistant(
    assistantDto: CreateAssistantDto
  ): Promise<ClientAssistantDto> {
    try {
      const response = await this.client.assistants.create(assistantDto)
      if (!response)
        throw RequestError.internalServerError('Error creating assistant')

      const openaiId = response as string
      const assistantEntity = AssistantMapper.toEntity(
        assistantDto,
        openaiId,
        // TODO: Temporalmente
        UUID.nano()
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
      throw error
    }
  }

  async getAssistantsList() {}
}

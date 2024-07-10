import { AssistantDto } from '@/domain/dtos'
import { AssistantRepositoryImpl } from '@/infrastructure/repositories'
import { OpenAiClientPlugin } from '@config/plugins'

export class AssistantService {
  constructor(
    private readonly client: OpenAiClientPlugin,
    private readonly assistantRepository: AssistantRepositoryImpl
  ) {}

  async createAssistant(assistantDto: AssistantDto) {
    try {
      // const createdAssistant = await this.client.assistants.create(assistantDto)
      // const assistantEntity = AssistantEntity.createFromDto(createdAssistant)
      const createdAssistant = await this.assistantRepository.create(
        assistantDto
      )
      //return { assistantEntity }
    } catch (error) {
      throw error
    }
  }

  async getAssistantsList() {}
}

import { Assistant } from 'openai/resources/beta/assistants'
import { AssistantDto } from '../../../domain/dtos'
import { ModelType } from '../../../domain/entities/gpt-assistants/assistant.entity'
import { OpenAiClient } from '../openai-client.plugin'

export class AssistantsClientPlugin {
  private constructor(private readonly client: OpenAiClient) {}

  static create(client: OpenAiClient): AssistantsClientPlugin {
    return new AssistantsClientPlugin(client)
  }

  private static createParamsObject(dto: AssistantDto) {
    const options = {
      description: dto.description,
      instructions: dto.instructions,
      model: dto.model,
      name: dto.name,
      temperature: dto.temperature,
      top_p: dto.topP,
    }

    return options
  }

  private static createDtoFromResponse(response: Assistant): AssistantDto {
    const assistantDto = AssistantDto.create({
      description: response.description!,
      instructions: response.instructions!,
      model: response.model! as ModelType,
      name: response.name!,
      temperature: response.temperature!,
      topP: response.top_p!,
      openaiId: response.id,
    })

    return assistantDto
  }

  public async create(dto: AssistantDto): Promise<AssistantDto> {
    const options = AssistantsClientPlugin.createParamsObject(dto)
    const createdAssistant = await this.client.beta.assistants.create(options)

    return AssistantsClientPlugin.createDtoFromResponse(createdAssistant)
  }

  public async update(dto: AssistantDto): Promise<AssistantDto> {
    const options = AssistantsClientPlugin.createParamsObject(dto)
    const updatedAssistant = await this.client.beta.assistants.update(
      dto.openaiId,
      options
    )

    return AssistantsClientPlugin.createDtoFromResponse(updatedAssistant)
  }

  public async delete(openaiId: string): Promise<boolean> {
    const response = await this.client.beta.assistants.del(openaiId)
    return response.deleted
  }
}

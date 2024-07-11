import { AssistantCreateParams } from 'openai/resources/beta/assistants'
import { CreateAssistantDto } from '@domain/dtos'
import { OpenAiClient } from '@config/plugins'

export class AssistantsClientPlugin {
  private constructor(private readonly client: OpenAiClient) {}

  static create(client: OpenAiClient): AssistantsClientPlugin {
    return new AssistantsClientPlugin(client)
  }

  private static createParamsObject(
    dto: CreateAssistantDto
  ): AssistantCreateParams {
    return {
      description: dto.description,
      instructions: dto.instructions,
      model: dto.model,
      name: dto.name,
      temperature: dto.temperature,
      top_p: dto.topP,
    }
  }

  public async create(
    assistantDto: CreateAssistantDto
  ): Promise<string | boolean> {
    const options = AssistantsClientPlugin.createParamsObject(assistantDto)
    return this.client.beta.assistants
      .create(options)
      .then((response) => {
        if (!response.id) return false
        return response.id
      })
      .catch(() => false)
  }

  public async update(
    assistantDto: CreateAssistantDto,
    openaiId: string
  ): Promise<boolean> {
    const options = AssistantsClientPlugin.createParamsObject(assistantDto)
    return this.client.beta.assistants
      .update(openaiId, options)
      .then((response) => {
        if (!response.id) return false
        return true
      })
      .catch(() => false)
  }

  public async delete(openaiId: string): Promise<boolean> {
    return this.client.beta.assistants
      .del(openaiId)
      .then((response) => response.deleted)
      .catch(() => false)
  }
}

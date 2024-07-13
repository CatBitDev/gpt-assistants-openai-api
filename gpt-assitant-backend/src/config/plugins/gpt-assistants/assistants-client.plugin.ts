import { AssistantCreateParams } from 'openai/resources/beta/assistants'
import { CreateAssistantDto } from '@domain/dtos/gpt-assistants'
import { LoggerPlugin, OpenAiClient } from '@config/plugins'

export class AssistantsClientPlugin {
  private constructor(
    private readonly client: OpenAiClient,
    private readonly logger: LoggerPlugin,
    private readonly service: string = 'assistants-client-plugin'
  ) {}

  static create(
    client: OpenAiClient,
    logger: LoggerPlugin
  ): AssistantsClientPlugin {
    return new AssistantsClientPlugin(client, logger)
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
        if (response.id) return response.id
        this.logger.http("Couldn't create assistant", this.service)
        return false
      })
      .catch((error) => {
        this.logger.error(
          `Error creating assistant: ${error.message}`,
          this.service,
          { error: error.stack }
        )
        return false
      })
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
      .catch((error) => {
        this.logger.error(
          `Error updating assistant: ${error.message}`,
          this.service,
          { error: error.stack }
        )
        return false
      })
  }

  public async delete(openaiId: string): Promise<boolean> {
    return this.client.beta.assistants
      .del(openaiId)
      .then((response) => response.deleted)
      .catch((error) => {
        this.logger.error(
          `Error deleting assistant: ${error.message}`,
          this.service,
          { error: error.stack }
        )
        return false
      })
  }
}

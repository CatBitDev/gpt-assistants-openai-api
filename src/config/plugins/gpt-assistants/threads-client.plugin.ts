import { Thread } from 'openai/resources/beta/threads/threads'
import { ThreadDto } from '@domain/dtos'
import { LoggerPlugin, OpenAiClient } from '@config/plugins'

export class ThreadsClientPlugin {
  private constructor(
    private readonly client: OpenAiClient,
    private readonly logger: LoggerPlugin
  ) {}

  static create(
    client: OpenAiClient,
    logger: LoggerPlugin
  ): ThreadsClientPlugin {
    return new ThreadsClientPlugin(client, logger)
  }

  private static createDtoFromResponse(response: Thread): ThreadDto {
    const threadDto = ThreadDto.create(response.id)
    return threadDto
  }

  public async create(): Promise<ThreadDto> {
    const createdThread = await this.client.beta.threads.create()
    return ThreadsClientPlugin.createDtoFromResponse(createdThread)
  }

  public async delete(openaiThreadId: string): Promise<boolean> {
    const response = await this.client.beta.threads.del(openaiThreadId)
    return response.deleted
  }
}

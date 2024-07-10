import {
  Message,
  TextContentBlock,
} from 'openai/resources/beta/threads/messages'
import { MessageDto } from '../../../domain/dtos'
import { OpenAiClient } from '../openai-client.plugin'

interface GetMessageListOptions {
  threadId: string
  openaiThreadId: string
}

interface GetSingleMessageOptions {
  threadId: string
  openaiThreadId: string
  openaiMessageId: string
}

interface DeleteMessageOptions {
  openaiThreadId: string
  openaiMessageId: string
}

export class MessagesClientPlugin {
  private constructor(private readonly client: OpenAiClient) {}

  static create(client: OpenAiClient): MessagesClientPlugin {
    return new MessagesClientPlugin(client)
  }

  private static createParamsObject(dto: MessageDto) {
    const options = {
      role: dto.role,
      content: dto.content,
    }

    return options
  }

  private static createDtoFromResponse(
    response: Message,
    threadId: string
  ): MessageDto {
    const textContent = response.content[0] as TextContentBlock
    const content = textContent.text.value

    const messageDto = MessageDto.create({
      content,
      openaiId: response.id,
      openaiThreadId: response.thread_id,
      role: response.role,
      threadId: threadId,
    })

    return messageDto
  }

  public async create(dto: MessageDto): Promise<MessageDto> {
    const options = MessagesClientPlugin.createParamsObject(dto)
    const createdMessage = await this.client.beta.threads.messages.create(
      dto.openaiThreadId,
      options
    )

    return MessagesClientPlugin.createDtoFromResponse(
      createdMessage,
      dto.threadId
    )
  }

  public async getList(options: GetMessageListOptions): Promise<MessageDto[]> {
    const { threadId, openaiThreadId } = options
    const messages = await this.client.beta.threads.messages.list(
      openaiThreadId
    )

    const messageDtos = messages.data.map((message: Message) =>
      MessagesClientPlugin.createDtoFromResponse(message, threadId)
    )

    return messageDtos
  }

  public async getSingle(
    options: GetSingleMessageOptions
  ): Promise<MessageDto> {
    const { threadId, openaiThreadId, openaiMessageId } = options
    const message = await this.client.beta.threads.messages.retrieve(
      openaiThreadId,
      openaiMessageId
    )

    const messageDto = MessagesClientPlugin.createDtoFromResponse(
      message,
      threadId
    )
    return messageDto
  }

  public async delete(options: DeleteMessageOptions): Promise<boolean> {
    const { openaiThreadId, openaiMessageId } = options
    const response = await this.client.beta.threads.messages.del(
      openaiThreadId,
      openaiMessageId
    )
    return response.deleted
  }
}

import { Run } from 'openai/resources/beta/threads/runs/runs'
import { MessageDto, RunDto } from '../../../domain/dtos'
import { RunStatus } from '../../../domain/entities/gpt-assistants/run.entity'
import { OpenAiClient } from '../openai-client.plugin'
import {
  Message,
  MessageDeltaEvent,
  TextContentBlock,
} from 'openai/resources/beta/threads/messages'
import { Stream } from 'openai/streaming'
import { AssistantStreamEvent } from 'openai/resources/beta/assistants'

interface HandleStreamOptions {
  runDto: RunDto
  stream: Stream<AssistantStreamEvent>
  callback: (runDto: RunDto, messageDto: MessageDto) => void
}

export class RunsClientPlugin {
  private constructor(private readonly client: OpenAiClient) {}

  static create(client: OpenAiClient): RunsClientPlugin {
    return new RunsClientPlugin(client)
  }

  private static createParamsObject(dto: RunDto) {
    const options = {
      assistant_id: dto.assistantId,
      max_input_tokens: dto.maxInputTokens,
      max_output_tokens: dto.maxOutputTokens,
    }

    return options
  }

  private static createRunDtoFromResponse(
    response: Run,
    runStatus: RunStatus,
    runDto: RunDto
  ): RunDto {
    const usage = {
      promptTokens: response.usage?.prompt_tokens || runDto.usage.promptTokens,
      completionTokens:
        response.usage?.completion_tokens || runDto.usage.completionTokens,
      totalTokens: response.usage?.total_tokens || runDto.usage.totalTokens,
    }

    const completedAt = response.completed_at || runDto.completedAt
    const startedAt = response.started_at || runDto.startedAt

    return RunDto.create({
      ...runDto,
      usage,
      completedAt,
      startedAt,
      status: runStatus,
    })
  }

  private static getTextContentFromResponse(data: Message | MessageDeltaEvent) {
    if (data.object === 'thread.message.delta')
      return data.delta.content![0] as TextContentBlock
    return data.content[0] as TextContentBlock
  }

  private static createMessageDtoFromResponse(
    data: Message | MessageDeltaEvent,
    messageDto: MessageDto
  ): MessageDto {
    const openaiId = data.id
    const textContent = RunsClientPlugin.getTextContentFromResponse(data)
    const content = textContent.text.value

    return MessageDto.create({
      ...messageDto,
      openaiId,
      content,
    })
  }

  private static async handleStream(options: HandleStreamOptions) {
    let { runDto, stream, callback } = options

    let messageDto = MessageDto.create({
      content: 'empty',
      role: 'assistant',
      threadId: runDto.threadId,
      openaiThreadId: runDto.openaiThreadId,
    })
    let runStatus: RunStatus

    for await (const { event, data } of stream) {
      switch (event) {
        case 'thread.message.created':
        case 'thread.message.delta':
        case 'thread.message.completed':
          messageDto = RunsClientPlugin.createMessageDtoFromResponse(
            data,
            messageDto
          )
          break
        case 'thread.run.cancelled':
        case 'thread.run.cancelling':
        case 'thread.run.completed':
        case 'thread.run.expired':
        case 'thread.run.failed':
        case 'thread.run.in_progress':
        case 'thread.run.incomplete':
        case 'thread.run.queued':
        case 'thread.run.requires_action':
          runStatus = RunStatus[event.split('.')[2] as keyof typeof RunStatus]
          runDto = RunsClientPlugin.createRunDtoFromResponse(
            data,
            runStatus,
            runDto
          )
          break
      }
      callback(runDto, messageDto)
    }
  }

  public async createStream(
    dto: RunDto,
    callback: (runDto: RunDto, messageDto: MessageDto) => void
  ) {
    const options = RunsClientPlugin.createParamsObject(dto)
    const stream = await this.client.beta.threads.runs.create(
      dto.openaiThreadId,
      { ...options, stream: true }
    )
    RunsClientPlugin.handleStream({ runDto: dto, stream, callback })
  }
}

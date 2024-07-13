import { UUID } from '@config/plugins'
import { RunStatus, RunUsage } from '@domain/entities/gpt-assistants'
import { assess } from '@domain/variable-validator'

export interface CreateRunDtoOptions {
  assistantId: string
  completedAt?: number
  maxInputTokens?: number
  maxOutputTokens?: number
  openaiAssistantId?: string
  openaiId?: string
  openaiThreadId?: string
  status?: RunStatus
  startedAt?: number
  threadId: string
  usage?: RunUsage
}

export class RunDto {
  private constructor(
    public readonly assistantId: string,
    public readonly completedAt: number,
    public readonly createdAt: number,
    public readonly id: string,
    public readonly maxInputTokens: number,
    public readonly maxOutputTokens: number,
    public readonly openaiAssistantId: string,
    public readonly openaiId: string,
    public readonly openaiThreadId: string,
    public readonly startedAt: number,
    public readonly status: RunStatus,
    public readonly threadId: string,
    public readonly usage: RunUsage
  ) {}

  public static create(options: CreateRunDtoOptions): RunDto {
    let {
      assistantId,
      maxInputTokens,
      maxOutputTokens,
      openaiAssistantId = '',
      openaiId = '',
      openaiThreadId = '',
      threadId,
      startedAt,
      status = RunStatus.queued,
      completedAt,
      usage = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    } = options
    const id = UUID.nano()
    const createdAt = Date.now()

    assistantId = assess({ assistantId }).asString()
    completedAt = assess({ startedAt, default: 0 }).asInt()
    maxInputTokens = assess({ maxInputTokens, default: 1000 }).asInt()
    maxOutputTokens = assess({ maxOutputTokens, default: 1000 }).asInt()
    startedAt = assess({ startedAt, default: 0 }).asInt()
    threadId = assess({ threadId }).asString()

    const { promptTokens, completionTokens } = usage
    usage = {
      promptTokens: assess({ promptTokens, default: 0 }).asInt(),
      completionTokens: assess({ completionTokens, default: 0 }).asInt(),
      totalTokens: promptTokens + completionTokens,
    }

    return new RunDto(
      assistantId,
      startedAt,
      createdAt,
      id,
      maxInputTokens,
      maxOutputTokens,
      openaiAssistantId,
      openaiId,
      openaiThreadId,
      completedAt,
      status,
      threadId,
      usage
    )
  }
}

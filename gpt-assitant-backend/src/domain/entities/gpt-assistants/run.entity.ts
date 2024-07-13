import { RunDto } from '@domain/dtos/gpt-assistants'

export enum RunStatus {
  cancelled = 'cancelled',
  cancelling = 'cancelling',
  completed = 'completed',
  expired = 'expired',
  failed = 'failed',
  in_progress = 'in_progress',
  incomplete = 'incomplete',
  queued = 'queued',
  requiresAction = 'requiresAction',
}

export interface RunUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export class RunEntity {
  private constructor(
    private readonly _assistantId: string,
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiAssistantId: string,
    private readonly _openaiId: string,
    private readonly _openaiThreadId: string,
    private readonly _threadId: string,
    private readonly _usage: RunUsage,
    private _completedAt: number,
    private _maxInputTokens: number,
    private _maxOutputTokens: number,
    private _startedAt: number,
    private _status: RunStatus
  ) {}

  public static createFromDto(dto: RunDto): RunEntity {
    return new RunEntity(
      dto.assistantId,
      dto.createdAt,
      dto.id,
      dto.openaiAssistantId,
      dto.openaiId,
      dto.openaiThreadId,
      dto.threadId,
      dto.usage,
      dto.completedAt,
      dto.maxInputTokens,
      dto.maxOutputTokens,
      dto.startedAt,
      dto.status
    )
  }

  public get assistantId(): string {
    return this._assistantId
  }

  public get createdAt(): number {
    return this._createdAt
  }

  public get id(): string {
    return this._id
  }

  public get openaiAssistantId(): string {
    return this._openaiAssistantId
  }

  public get openaiId(): string {
    return this._openaiId
  }

  public get openaiThreadId(): string {
    return this._openaiThreadId
  }

  public get threadId(): string {
    return this._threadId
  }

  public get usage(): RunUsage {
    return this._usage
  }

  public get completedAt(): number {
    return this._completedAt
  }

  public get maxInputTokens(): number {
    return this._maxInputTokens
  }

  public get maxOutputTokens(): number {
    return this._maxOutputTokens
  }

  public get startedAt(): number {
    return this._startedAt
  }

  public get status(): RunStatus {
    return this._status
  }
}

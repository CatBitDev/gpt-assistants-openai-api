import { MessageDto } from '@domain/dtos'

export type RoleType = 'assistant' | 'user'

export class MessageEntity {
  private constructor(
    private readonly _content: string,
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiId: string,
    private readonly _openaiThreadId: string,
    private readonly _role: RoleType,
    private readonly _threadId: string
  ) {}

  public static createFromDto(dto: MessageDto): MessageEntity {
    return new MessageEntity(
      dto.content,
      dto.createdAt,
      dto.id,
      dto.openaiId,
      dto.openaiThreadId,
      dto.role,
      dto.threadId
    )
  }

  public get content(): string {
    return this._content
  }

  public get createdAt(): number {
    return this._createdAt
  }

  public get id(): string {
    return this._id
  }

  public get openaiId(): string {
    return this._openaiId
  }

  public get openaiThreadId(): string {
    return this._openaiThreadId
  }

  public get role(): string {
    return this._role
  }

  public get threadId(): string {
    return this._threadId
  }
}

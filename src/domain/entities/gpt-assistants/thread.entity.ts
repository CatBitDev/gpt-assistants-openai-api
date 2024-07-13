import { ThreadDto } from '@domain/dtos'

export class ThreadEntity {
  private constructor(
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiId: string,
    private readonly _userId: string
  ) {}

  public static createFromDto(dto: ThreadDto): ThreadEntity {
    return new ThreadEntity(dto.createdAt, dto.id, dto.openaiId, 'dto.userId')
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
}

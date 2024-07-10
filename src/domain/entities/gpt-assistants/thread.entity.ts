import { ThreadDto } from '../../dtos'

export class ThreadEntity {
  private constructor(
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiId: string
  ) {}

  public static createFromDto(dto: ThreadDto): ThreadEntity {
    return new ThreadEntity(dto.createdAt, dto.id, dto.openaiId)
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

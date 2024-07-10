import { UUID } from '@config/plugins'

export class ThreadDto {
  constructor(
    public readonly createdAt: number,
    public readonly id: string,
    public readonly openaiId: string
  ) {}

  public static create(openaiId: string = ''): ThreadDto {
    const createdAt = Date.now()
    const id = UUID.uuidv4()

    return new ThreadDto(createdAt, id, openaiId)
  }
}

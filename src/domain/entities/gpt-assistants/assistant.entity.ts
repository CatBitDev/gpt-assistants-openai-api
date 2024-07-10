import { AssistantDto } from '@domain/dtos'

export type ModelType = 'gpt-4o' | 'gpt-3.5-turbo'

export class AssistantEntity {
  private constructor(
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiId: string,
    private _description: string,
    private _instructions: string,
    private _model: ModelType,
    private _name: string,
    private _temperature: number,
    private _topP: number
  ) {}

  public static createFromDto(dto: AssistantDto): AssistantEntity {
    return new AssistantEntity(
      dto.createdAt,
      dto.id,
      dto.openaiId,
      dto.description,
      dto.instructions,
      dto.model,
      dto.name,
      dto.temperature,
      dto.topP
    )
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

  public get description(): string {
    return this._description
  }

  public get instructions(): string {
    return this._instructions
  }

  public get model(): string {
    return this._model
  }

  public get name(): string {
    return this._name
  }

  public get temperature(): number {
    return this._temperature
  }

  public get topP(): number {
    return this._topP
  }
}

import { UUID } from '@config/plugins'

export type GptModelType = 'gpt-4o' | 'gpt-3.5-turbo'

export interface CreateAssistantEntityOptions {
  id?: string
  createdAt?: number
  openaiId: string
  userId: string
  description: string
  instructions: string
  model: GptModelType
  name: string
  temperature: number
  topP: number
}

export class AssistantEntity {
  private constructor(
    private readonly _createdAt: number,
    private readonly _id: string,
    private readonly _openaiId: string,
    private readonly _userId: string,
    private _description: string,
    private _instructions: string,
    private _model: GptModelType,
    private _name: string,
    private _temperature: number,
    private _topP: number
  ) {}

  public static create(options: CreateAssistantEntityOptions): AssistantEntity {
    const {
      id = UUID.nano(),
      createdAt = new Date().getTime(),
      openaiId,
      userId,
      description,
      instructions,
      model,
      name,
      temperature,
      topP,
    } = options

    return new AssistantEntity(
      createdAt,
      id,
      openaiId,
      userId,
      description,
      instructions,
      model,
      name,
      temperature,
      topP
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

  public get userId(): string {
    return this._userId
  }

  public get description(): string {
    return this._description
  }

  public get instructions(): string {
    return this._instructions
  }

  public get model(): GptModelType {
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

import { UUID } from '@config/plugins'
import { GptModelType } from '@domain/entities/'
import { assess } from '@domain/variable-validator'

export interface CreateAssistantDtoOptions {
  description?: string
  instructions?: string
  model?: GptModelType
  name: string
  openaiId?: string
  temperature?: number
  topP?: number
}

export class AssistantDto {
  private constructor(
    public readonly createdAt: number,
    public readonly description: string,
    public readonly id: string,
    public readonly instructions: string,
    public readonly model: GptModelType,
    public readonly name: string,
    public readonly openaiId: string,
    public readonly temperature: number,
    public readonly topP: number
  ) {}

  public static create(options: CreateAssistantDtoOptions) {
    let {
      description,
      instructions,
      model = 'gpt-3.5-turbo',
      name,
      openaiId = '',
      temperature,
      topP,
    } = options
    const id = UUID.uuidv4()
    const createdAt = Date.now()

    description =
      assess({ description, required: false }).asString() ??
      'No description provided.'
    instructions = assess({ instructions }).asString()
    name = assess({ name }).asString()
    temperature = assess({ temperature, default: 1 }).asInt()
    topP = assess({ topP, default: 1 }).asInt()

    assess({ model }).asString()
    if (!['gpt-4o', 'gpt-3.5-turbo'].includes(model)) model = 'gpt-3.5-turbo'

    return new AssistantDto(
      createdAt,
      description,
      id,
      instructions,
      model,
      name,
      openaiId,
      temperature,
      topP
    )
  }
}

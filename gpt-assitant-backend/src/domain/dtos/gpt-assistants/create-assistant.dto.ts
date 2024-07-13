import { GptModelType } from '@/domain/entities/gpt-assistants'
import { assess } from '@/domain/variable-validator'
import { VariableValidatorError as varError } from '@domain/errors'

export interface CreateAssistantDtoParams {
  description?: string
  instructions: string
  model?: GptModelType
  name: string
  temperature?: number
  topP?: number
}

export class CreateAssistantDto {
  private constructor(
    public readonly description: string,
    public readonly instructions: string,
    public readonly model: GptModelType,
    public readonly name: string,
    public readonly temperature: number,
    public readonly topP: number
  ) {}

  public static create(options: CreateAssistantDtoParams): CreateAssistantDto {
    let { description, instructions, model, name, temperature, topP } = options

    description = assess({
      description,
      default: 'No description provided.',
    }).asString()
    instructions = assess({ instructions }).asString()
    model = assess({
      model,
      default: 'gpt-3.5-turbo',
    }).asString() as GptModelType
    name = assess({ name }).asString()
    temperature = assess({ temperature, default: 1.0 }).asFloatPositive()
    topP = assess({ topP, default: 1.0 }).asFloatPositive()

    if (!['gpt-4o', 'gpt-3.5-turbo'].includes(model))
      throw varError.invalidValue('model [gpt-4o, gpt-3.5-turbo]', model)
    if (temperature < 0 || temperature > 2)
      throw varError.invalidValue('temperature [0.0 - 2.0]', temperature)
    if (topP < 0.01 || topP > 1)
      throw varError.invalidValue('topP [0.01 - 1.0]', topP)

    return new CreateAssistantDto(
      description,
      instructions,
      model,
      name,
      temperature,
      topP
    )
  }
}

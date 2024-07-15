import { CreateAssistantDto } from './create-assistant.dto'

export interface CreateClientAssistantDtoParams {
  assistantDto: CreateAssistantDto
  id: string
}

export class ClientAssistantDto {
  private constructor(
    public readonly assistantDto: CreateAssistantDto,
    public readonly id: string
  ) {}

  public static create(
    options: CreateClientAssistantDtoParams
  ): ClientAssistantDto {
    const { assistantDto, id } = options
    return new ClientAssistantDto(assistantDto, id)
  }
}

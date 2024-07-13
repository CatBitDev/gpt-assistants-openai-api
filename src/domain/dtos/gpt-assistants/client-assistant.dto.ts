import { CreateAssistantDto } from './create-assistant.dto'

export interface CreateClientAssistantDtoParams {
  assistantDto: CreateAssistantDto
  id: string
  userId: string
}

export class ClientAssistantDto {
  private constructor(
    public readonly assistantDto: CreateAssistantDto,
    public readonly id: string,
    public readonly userId: string
  ) {}

  public static create(
    options: CreateClientAssistantDtoParams
  ): ClientAssistantDto {
    const { assistantDto, id, userId } = options
    return new ClientAssistantDto(assistantDto, id, userId)
  }
}

import {
  CreateAssistantDto,
  ClientAssistantDto,
} from '@domain/dtos/gpt-assistants'
import { AssistantEntity } from '@domain/entities/gpt-assistants'

export class AssistantMapper {
  static toEntity(
    dto: CreateAssistantDto,
    openaiId: string,
    userId: string
  ): AssistantEntity {
    const entity = AssistantEntity.create({
      openaiId,
      userId,
      description: dto.description,
      instructions: dto.instructions,
      model: dto.model,
      name: dto.name,
      temperature: dto.temperature,
      topP: dto.topP,
    })
    return entity
  }

  static toCreateAssistantDto(entity: AssistantEntity): CreateAssistantDto {
    const dto = CreateAssistantDto.create({
      description: entity.description,
      instructions: entity.instructions,
      model: entity.model,
      name: entity.name,
      temperature: entity.temperature,
      topP: entity.topP,
    })
    return dto
  }

  static toClientAssistantDto(entity: AssistantEntity): ClientAssistantDto {
    const assistantDto = AssistantMapper.toCreateAssistantDto(entity)
    const dto = ClientAssistantDto.create({
      assistantDto,
      id: entity.id,
      userId: entity.userId,
    })
    return dto
  }
}

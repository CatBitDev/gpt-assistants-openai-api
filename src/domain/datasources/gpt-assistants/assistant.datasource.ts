import { AssistantDto } from '@domain/dtos'

export abstract class AssistantDatasource {
  public abstract create(dto: AssistantDto): Promise<AssistantDto>
  public abstract delete(assistantId: string): Promise<void>
  public abstract getList(threadId: string): Promise<AssistantDto[] | null>
  public abstract getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantDto | null>
  public abstract update(dto: AssistantDto): Promise<AssistantDto>
}

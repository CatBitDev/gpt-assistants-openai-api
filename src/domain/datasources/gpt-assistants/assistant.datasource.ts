import { AssistantEntity } from '@/domain/entities'

export abstract class AssistantDatasource {
  public abstract create(entity: AssistantEntity): Promise<boolean>
  public abstract delete(assistantId: string): Promise<void>
  public abstract getList(
    threadId: string
  ): Promise<AssistantEntity[] | undefined>
  public abstract getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantEntity | undefined>
  public abstract update(entity: AssistantEntity): Promise<boolean>
}

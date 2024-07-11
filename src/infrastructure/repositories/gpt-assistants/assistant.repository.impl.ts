import { AssistantDatasource } from '@domain/datasources'
import { AssistantEntity } from '@domain/entities'
import { AssistantRepository } from '@domain/repository'

export class AssistantRepositoryImpl implements AssistantRepository {
  constructor(private readonly assistantDatasource: AssistantDatasource) {}

  public async create(entity: AssistantEntity): Promise<boolean> {
    return this.assistantDatasource.create(entity)
  }
  public async delete(assistantId: string): Promise<void> {
    return this.assistantDatasource.delete(assistantId)
  }
  public async getList(
    threadId: string
  ): Promise<AssistantEntity[] | undefined> {
    return this.assistantDatasource.getList(threadId)
  }
  public async getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantEntity | undefined> {
    return this.assistantDatasource.getSingle(threadId, assistantId)
  }
  public async update(entity: AssistantEntity): Promise<boolean> {
    return this.assistantDatasource.update(entity)
  }
}

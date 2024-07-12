import { AssistantDatasource } from '@domain/datasources'
import { AssistantEntity } from '@domain/entities'
import { AssistantRepository } from '@domain/repository'
import { RegistryDatasource } from '@/infrastructure/datasources/registry.datasource'

export class AssistantRepositoryImpl implements AssistantRepository {
  private static _instance: AssistantRepositoryImpl
  private readonly assistantDatasource: AssistantDatasource

  private constructor() {
    this.assistantDatasource = RegistryDatasource.instance.assistant
  }

  public static get instance(): AssistantRepositoryImpl {
    if (!AssistantRepositoryImpl._instance) {
      AssistantRepositoryImpl._instance = new AssistantRepositoryImpl()
    }
    return AssistantRepositoryImpl._instance
  }

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

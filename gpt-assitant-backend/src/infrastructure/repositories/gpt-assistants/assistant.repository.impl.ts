import { RegistryDatasource } from '@/infrastructure/datasources/registry.datasource'
import {
  AssistantDatasource,
  CreateOptions,
  DeleteOptions,
  FindByIdOptions,
  FindByUserIdOptions,
  UpdateOptions,
  SingleResponse,
  ListResponse,
} from '@domain/datasources/gpt-assistants'
import { AssistantRepository } from '@domain/repository/gpt-assistants'

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

  public create(opt: CreateOptions): Promise<SingleResponse> {
    return this.assistantDatasource.create(opt)
  }
  public delete(opt: DeleteOptions): Promise<SingleResponse> {
    return this.assistantDatasource.delete(opt)
  }
  public findById(opt: FindByIdOptions): Promise<SingleResponse> {
    return this.assistantDatasource.findById(opt)
  }
  public findByUserId(opt: FindByUserIdOptions): Promise<ListResponse> {
    return this.assistantDatasource.findByUserId(opt)
  }
  public update(opt: UpdateOptions): Promise<SingleResponse> {
    return this.assistantDatasource.update(opt)
  }
}

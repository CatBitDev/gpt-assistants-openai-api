import {
  MongoAssistantDatasource,
  MongoUserDatasource,
} from '@/infrastructure/datasources/mongo'
import { AssistantDatasource, UserDatasource } from '@domain/datasources'

export class DatasourceRegistry {
  private static _instance: DatasourceRegistry

  private readonly assistantDatasource: AssistantDatasource
  private readonly userDatasource: UserDatasource

  private constructor() {
    this.assistantDatasource = new MongoAssistantDatasource()
    this.userDatasource = new MongoUserDatasource()
  }

  public get assistant() {
    return this.assistantDatasource
  }

  public get user() {
    return this.userDatasource
  }

  public static get instance(): DatasourceRegistry {
    if (!DatasourceRegistry._instance) {
      DatasourceRegistry._instance = new DatasourceRegistry()
    }
    return DatasourceRegistry._instance
  }
}

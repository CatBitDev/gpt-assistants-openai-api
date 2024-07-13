import { AssistantModel, LogModel, UserModel } from '@/data/mongo'
import {
  MongoAssistantDatasource,
  MongoLogDatasource,
  MongoUserDatasource,
} from '@/infrastructure/datasources/mongo'
import {
  AssistantDatasource,
  LogDatasource,
  UserDatasource,
} from '@domain/datasources'
import { Connection } from 'mongoose'

interface Options {
  assistantDbConnection: Connection
  logsDbConnection: Connection
}

export class RegistryDatasource {
  private static _instance: RegistryDatasource

  private readonly logDatasource: LogDatasource
  private readonly assistantDatasource: AssistantDatasource
  private readonly userDatasource: UserDatasource

  private constructor(
    private readonly assistantDbConnection: Connection,
    private readonly logsDbConnection: Connection
  ) {
    const logModel = new LogModel(this.logsDbConnection)
    this.logDatasource = new MongoLogDatasource(logModel)

    const userModel = new UserModel(this.assistantDbConnection)
    const assistantModel = new AssistantModel(this.assistantDbConnection)
    this.assistantDatasource = new MongoAssistantDatasource(assistantModel)
    this.userDatasource = new MongoUserDatasource(userModel)
  }

  public static create(options: Options) {
    if (RegistryDatasource._instance) return RegistryDatasource._instance

    const { assistantDbConnection, logsDbConnection } = options
    RegistryDatasource._instance = new RegistryDatasource(
      assistantDbConnection,
      logsDbConnection
    )
  }

  public static get instance(): RegistryDatasource {
    if (!RegistryDatasource._instance)
      throw new Error('RegistryDatasource not initialized')

    return RegistryDatasource._instance
  }

  public get assistant() {
    return this.assistantDatasource
  }

  public get user() {
    return this.userDatasource
  }

  public get log() {
    return this.logDatasource
  }
}

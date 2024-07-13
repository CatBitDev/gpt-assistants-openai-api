import { LogDatasource } from '@/domain/datasources'
import { PaginationDto } from '@/domain/dtos'
import { LogEntity } from '@/domain/entities'
import { LogRepository } from '@/domain/repository'
import { RegistryDatasource } from '@/infrastructure/datasources/registry.datasource'

export class LogRepositoryImpl implements LogRepository {
  private static _instance: LogRepositoryImpl
  private readonly logDatasource: LogDatasource

  private constructor() {
    this.logDatasource = RegistryDatasource.instance.log
  }

  public static get instance(): LogRepositoryImpl {
    if (!LogRepositoryImpl._instance) {
      LogRepositoryImpl._instance = new LogRepositoryImpl()
    }
    return LogRepositoryImpl._instance
  }

  public create(log: LogEntity): Promise<LogEntity> {
    return this.logDatasource.create(log)
  }
  public delete(logId: string): Promise<LogEntity | undefined> {
    return this.logDatasource.delete(logId)
  }
  public getList(
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined> {
    return this.getList(pagination)
  }
  public getListByLevel(
    level: string,
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined> {
    return this.getListByLevel(level, pagination)
  }
  public findById(logId: string): Promise<LogEntity | undefined> {
    return this.findById(logId)
  }
  public findByLevel(level: string): Promise<LogEntity | undefined> {
    return this.findByLevel(level)
  }
}

import { LogModel } from '@data/mongo'
import { LogDatasource } from '@domain/datasources/log'
import { PaginationDto } from '@domain/dtos/shared'
import { LogEntity } from '@domain/entities/log'

export class MongoLogDatasource implements LogDatasource {
  private readonly model

  constructor(private readonly logModel: LogModel) {
    this.model = this.logModel.model
  }

  public async create(log: LogEntity): Promise<LogEntity> {
    const props = this.getPropsFromEntity(log)
    const createdLog = await this.model.create(props)

    return this.getEntityFromModel(createdLog)
  }

  public async delete(logId: string): Promise<LogEntity | undefined> {
    const deletedLog = await this.model.deleteOne({ id: logId })
    return this.getEntityFromModel(deletedLog)
  }

  public async getList(
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined> {
    return this.searchLogsByParams({}, pagination)
  }
  public async getListByLevel(
    level: string,
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined> {
    return this.searchLogsByParams({ level }, pagination)
  }
  public async findById(logId: string): Promise<LogEntity | undefined> {
    return this.findOne({ _id: logId })
  }
  public async findByLevel(level: string): Promise<LogEntity | undefined> {
    return this.findOne({ level })
  }

  private async findOne(options: {
    [key: string]: any
  }): Promise<LogEntity | undefined> {
    const log = await this.model.findOne(options)
    if (!log) return undefined

    return this.getEntityFromModel(log)
  }

  private async searchLogsByParams(
    params: { [key: string]: any },
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined> {
    const { page, limit } = pagination
    const [total, logList] = await Promise.all([
      this.model.countDocuments().where(params),
      this.model
        .find(params)
        .skip((page - 1) * limit)
        .limit(limit),
    ])

    if (!logList) return undefined

    const logEntities = logList.map((log) => {
      return this.getEntityFromModel(log)
    })

    const paginationDto = PaginationDto.create({
      page,
      limit,
      total,
    })
    return { logs: logEntities, pagination: paginationDto }
  }

  private getPropsFromEntity(entity: LogEntity) {
    return {
      level: entity.level,
      message: entity.message,
      createdAt: entity.createdAt,
      service: entity.service,
      metadata: entity.metadata,
    }
  }

  private getEntityFromModel(response: { [key: string]: any }): LogEntity {
    const { _id, level, message, createdAt, service, metadata } = response

    return LogEntity.fromModel({
      id: _id.toString(),
      level,
      message,
      createdAt,
      service,
      metadata,
    })
  }
}

import { LogEntity } from '@domain/entities/log'
import { LogRepositoryImpl } from '@infrastructure/repositories/log'
import Transport, { TransportStreamOptions } from 'winston-transport'

export class LoggerDatasourceTransportPlugin extends Transport {
  constructor(
    opts: TransportStreamOptions,
    private readonly logRepository: LogRepositoryImpl
  ) {
    super(opts)
  }

  log(info: { [key: string]: any }, next: () => void) {
    const { level, message, timestamp, service, metadata } = info

    const createdAt = new Date(timestamp).getTime()

    const logEntity = LogEntity.create({
      createdAt,
      level,
      message,
      service,
      metadata,
    })
    this.logRepository.create(logEntity)

    next()
  }
}

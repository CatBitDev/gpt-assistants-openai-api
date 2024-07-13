import winston, { format, Logform, Logger } from 'winston'
import Transport from 'winston-transport'
import {
  Argv,
  LoggerDatasourceTransportPlugin as LoggerDatasourceTransport,
} from '@config/plugins'
import { LogRepositoryImpl } from '@infrastructure/repositories/log/log.repository.impl'

export interface LogMetadata {
  [key: string]: any
}

export interface LogOptions {
  message: string
  metadata?: LogMetadata
  service?: string
}

export interface Options {
  logRepository: LogRepositoryImpl
}

export class LoggerPlugin {
  private static _instance: LoggerPlugin

  private constructor(private logger: Logger) {}

  public static create(options: Options) {
    if (LoggerPlugin._instance) return LoggerPlugin._instance

    const { logRepository } = options
    const logger = LoggerPlugin.createLogger()

    const consoleTransport = LoggerPlugin.createConsoleTransport()
    const datasourceTransport =
      LoggerPlugin.createDatasourceTransport(logRepository)

    if (Argv.mode === 'development')
      LoggerPlugin.addLoggerTransport(logger, consoleTransport)
    LoggerPlugin.addLoggerTransport(logger, datasourceTransport)

    LoggerPlugin._instance = new LoggerPlugin(logger)
    return LoggerPlugin._instance
  }

  private static createLogger(): Logger {
    const levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      HTTP: 3,
      VERBOSE: 4,
      DEBUG: 5,
      SILLY: 6,
    }

    const colors = {
      ERROR: 'red',
      WARN: 'yellow',
      INFO: 'green',
      HTTP: 'blue',
      VERBOSE: 'cyan',
      DEBUG: 'green',
      SILLY: 'grey',
    }

    winston.addColors(colors)
    return winston.createLogger({
      levels,
      format: format.combine(
        LoggerPlugin.timestampFormat,
        LoggerPlugin.customFormat
      ),
    })
  }

  private static createDatasourceTransport(
    logRepository: LogRepositoryImpl
  ): Transport {
    return new LoggerDatasourceTransport({ level: 'SILLY' }, logRepository)
  }

  private static createConsoleTransport(): Transport {
    return new winston.transports.Console({
      level: 'SILLY',
      format: format.combine(
        format.colorize(),
        LoggerPlugin.timestampFormat,
        LoggerPlugin.customFormat
      ),
    })
  }

  private static addLoggerTransport(logger: Logger, transport: Transport) {
    logger.add(transport)
  }

  private static get customFormat(): Logform.Format {
    return format.printf(({ level, message, service, timestamp }) => {
      let logService = ''
      if (service) logService = `[${service}] `
      return `[${timestamp} ${level}] ${logService}${message}`
    })
  }

  private static get timestampFormat(): Logform.Format {
    return format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    })
  }

  public static get instance(): LoggerPlugin {
    if (!LoggerPlugin._instance) throw new Error('LoggerPlugin not initialized')

    return LoggerPlugin._instance
  }

  public error = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('ERROR', { message, metadata, service })

  public warn = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('WARN', { message, metadata, service })

  public info = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('INFO', { message, metadata, service })

  public http = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('HTTP', { message, metadata, service })

  public verb = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('VERBOSE', { message, metadata, service })

  public debug = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('DEBUG', { message, metadata, service })

  public silly = (message: string, service?: string, metadata?: LogMetadata) =>
    this.log('SILLY', { message, metadata, service })

  private log = (level: string, options: LogOptions) => {
    const { message, metadata, service } = options
    this.logger.log({
      level,
      message,
      metadata,
      service,
    })
  }
}

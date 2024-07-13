import { UUID } from '@/config/plugins'

export type LogSeverityLevel =
  | 'ERROR'
  | 'WARN'
  | 'INFO'
  | 'HTTP'
  | 'VERBOSE'
  | 'DEBUG'
  | 'SILLY'

export interface CreateLogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt: number
  service?: string
  metadata?: { [key: string]: any }
}

export interface CreateLogFromModelOptions {
  id: string
  level: LogSeverityLevel
  message: string
  createdAt: number
  service?: string
  metadata?: { [key: string]: any }
}

export class LogEntity {
  private constructor(
    private readonly _id: string,
    private readonly _level: LogSeverityLevel,
    private readonly _message: string,
    private readonly _createdAt: number,
    private readonly _service?: string,
    private readonly _metadata?: { [key: string]: any }
  ) {}

  public static create(options: CreateLogEntityOptions): LogEntity {
    const { level, message, createdAt, service, metadata } = options

    const id = UUID.uuidv4()

    return new LogEntity(id, level, message, createdAt, service, metadata)
  }

  public static fromModel(options: CreateLogFromModelOptions): LogEntity {
    const { id, level, message, createdAt, service, metadata } = options

    return new LogEntity(id, level, message, createdAt, service, metadata)
  }

  public get id(): string {
    return this._id
  }

  public get level(): string {
    return this._level
  }

  public get message(): string {
    return this._message
  }

  public get createdAt(): number {
    return this._createdAt
  }

  public get service(): string | undefined {
    return this._service
  }

  public get metadata(): { [key: string]: any } | undefined {
    return this._metadata
  }
}

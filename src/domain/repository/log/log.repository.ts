import { PaginationDto } from '@/domain/dtos'
import { LogEntity } from '@/domain/entities'

export abstract class LogRepository {
  public abstract create(log: LogEntity): Promise<LogEntity>
  public abstract delete(logId: string): Promise<LogEntity | undefined>
  public abstract getList(
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined>
  public abstract getListByLevel(
    level: string,
    pagination: PaginationDto
  ): Promise<{ logs: LogEntity[]; pagination: PaginationDto } | undefined>
  public abstract findById(logId: string): Promise<LogEntity | undefined>
  public abstract findByLevel(level: string): Promise<LogEntity | undefined>
}

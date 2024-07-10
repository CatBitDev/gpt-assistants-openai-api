import { AssistantDatasource } from '@domain/datasources'
import { AssistantDto } from '@domain/dtos'
import { AssistantRepository } from '@domain/repository'

export class AssistantRepositoryImpl implements AssistantRepository {
  constructor(private readonly assistantDatasource: AssistantDatasource) {}

  public async create(dto: AssistantDto): Promise<AssistantDto> {
    return this.assistantDatasource.create(dto)
  }
  public async delete(assistantId: string): Promise<void> {
    return this.assistantDatasource.delete(assistantId)
  }
  public async getList(threadId: string): Promise<AssistantDto[] | null> {
    return this.assistantDatasource.getList(threadId)
  }
  public async getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantDto | null> {
    return this.assistantDatasource.getSingle(threadId, assistantId)
  }
  public async update(dto: AssistantDto): Promise<AssistantDto> {
    return this.assistantDatasource.update(dto)
  }
}

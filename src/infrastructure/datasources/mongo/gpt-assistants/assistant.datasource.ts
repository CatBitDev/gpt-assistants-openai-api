import { MongoAssistantModel } from '@data/mongo'
import { AssistantDatasource } from '@domain/datasources'
import { AssistantDto } from '@domain/dtos'

export class MongoAssistantDatasource implements AssistantDatasource {
  public async create(dto: AssistantDto): Promise<AssistantDto> {
    const createdAssistant = MongoAssistantModel.create(dto)
    console.log('Assistant created:', createdAssistant)
    return dto
  }
  public async delete(assistantId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async getList(threadId: string): Promise<AssistantDto[] | null> {
    throw new Error('Method not implemented.')
  }
  public async getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantDto | null> {
    throw new Error('Method not implemented.')
  }
  public async update(dto: AssistantDto): Promise<AssistantDto> {
    throw new Error('Method not implemented.')
  }
}

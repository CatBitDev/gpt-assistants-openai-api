import { AssistantModel } from '@data/mongo'
import { AssistantDatasource } from '@domain/datasources'
import { AssistantEntity } from '@domain/entities'

export class MongoAssistantDatasource implements AssistantDatasource {
  private readonly model
  constructor(private readonly assistantModel: AssistantModel) {
    this.model = this.assistantModel.model
  }

  private static getProps(entity: AssistantEntity) {
    return {
      createdAt: entity.createdAt,
      description: entity.description,
      id: entity.id,
      instructions: entity.instructions,
      model: entity.model,
      name: entity.name,
      openaiId: entity.openaiId,
      temperature: entity.temperature,
      topP: entity.topP,
      userId: entity.userId,
    }
  }

  public async create(entity: AssistantEntity): Promise<boolean> {
    const props = MongoAssistantDatasource.getProps(entity)
    const createdAssistant = await this.model.create(props)
    if (createdAssistant) return true
    return false
    //throw new Error('Method not implemented.')
  }

  public async delete(assistantId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async getList(
    threadId: string
  ): Promise<AssistantEntity[] | undefined> {
    throw new Error('Method not implemented.')
  }
  public async getSingle(
    threadId: string,
    assistantId: string
  ): Promise<AssistantEntity | undefined> {
    throw new Error('Method not implemented.')
  }
  public async update(entity: AssistantEntity): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

import { AssistantModel } from '@/data/mongo'
import {
  AssistantEntity,
  CreateAssistantEntityOptions,
} from '@/domain/entities/gpt-assistants'
import {
  AssistantDatasource,
  CreateOptions,
  DeleteOptions,
  FindByIdOptions,
  FindByUserIdOptions,
  UpdateOptions,
  SingleResponse,
  ListResponse,
} from '@domain/datasources/gpt-assistants'
import { SearchUseCases } from '@infrastructure/datasources/mongo/use-cases'

type Model = { [key: string]: any }

export class MongoAssistantDatasource implements AssistantDatasource {
  private readonly model

  constructor(private readonly assistantModel: AssistantModel) {
    this.model = this.assistantModel.model
  }

  public async create(opt: CreateOptions): Promise<SingleResponse> {
    const model = this.entityToModel(opt.assistantEntity)
    const createdAssistantModel = await this.model.create(model)
    if (!createdAssistantModel) return undefined

    return this.modelToEntity(createdAssistantModel)
  }
  public async delete(opt: DeleteOptions): Promise<SingleResponse> {
    const assistantEntity = await this.findById({
      assistantId: opt.assistantId,
    })

    if (!assistantEntity) return undefined

    const deletedAssistantModel = await this.model.deleteOne({
      _id: opt.assistantId,
    })
    if (deletedAssistantModel.deletedCount === 0) return undefined

    return assistantEntity
  }
  public async findById(opt: FindByIdOptions): Promise<SingleResponse> {
    const assistantModel = await this.model.findOne({ _id: opt.assistantId })
    if (!assistantModel) return undefined
    return this.modelToEntity(assistantModel)
  }
  public async findByUserId(opt: FindByUserIdOptions): Promise<ListResponse> {
    const { pagination, modelList } = await SearchUseCases.withPagination(
      this.model,
      { userId: opt.userId },
      opt.pagination
    )
    if (!modelList) return undefined

    const assistantEntityList = this.modelListToEntityList(modelList)

    return { assistants: assistantEntityList, pagination }
  }
  public async update(opt: UpdateOptions): Promise<SingleResponse> {
    const id = opt.assistantEntity.id
    const model = this.entityToModel(opt.assistantEntity)
    const updatedAssistantModel = await this.model.updateOne({ _id: id }, model)
    // if (!updatedAssistantModel) return undefined
    // console.log(updatedAssistantModel)

    return opt.assistantEntity
  }

  private entityToModel(entity: AssistantEntity) {
    return {
      createdAt: entity.createdAt,
      description: entity.description,
      instructions: entity.instructions,
      model: entity.model,
      name: entity.name,
      openaiId: entity.openaiId,
      temperature: entity.temperature,
      topP: entity.topP,
      userId: entity.userId,
    }
  }

  private modelListToEntityList(modelList: Model[]): AssistantEntity[] {
    return modelList.map((model) => this.modelToEntity(model))
  }

  private modelToEntity(_model: Model): AssistantEntity {
    const {
      _id,
      createdAt,
      description,
      instructions,
      model,
      name,
      openaiId,
      temperature,
      topP,
      userId,
    } = _model
    return AssistantEntity.create({
      createdAt,
      description,
      id: _id.toString(),
      instructions,
      model,
      name,
      openaiId,
      temperature,
      topP,
      userId: userId.toString(),
    })
  }
}

import { PaginationDto } from '@domain/dtos/shared'
import { AssistantEntity } from '@domain/entities/gpt-assistants'

export type ListResponse = List | undefined
export type SingleResponse = AssistantEntity | undefined
export type List = { assistants: AssistantEntity[]; pagination: PaginationDto }

export interface CreateOptions {
  assistantEntity: AssistantEntity
}

export interface UpdateOptions {
  assistantEntity: AssistantEntity
}

export interface DeleteOptions {
  assistantId: string
}

export interface FindByIdOptions {
  assistantId: string
}

export interface FindByUserIdOptions {
  userId: string
  pagination: PaginationDto
}

export abstract class AssistantRepository {
  public abstract create(opt: CreateOptions): Promise<SingleResponse>
  public abstract delete(opt: DeleteOptions): Promise<SingleResponse>
  public abstract findById(opt: FindByIdOptions): Promise<SingleResponse>
  public abstract findByUserId(opt: FindByUserIdOptions): Promise<ListResponse>
  public abstract update(opt: UpdateOptions): Promise<SingleResponse>
}

import {
  CreateOptions,
  DeleteOptions,
  FindByIdOptions,
  FindByUserIdOptions,
  UpdateOptions,
  SingleResponse,
  ListResponse,
} from '@domain/datasources/gpt-assistants'

export abstract class AssistantRepository {
  public abstract create(opt: CreateOptions): Promise<SingleResponse>
  public abstract delete(opt: DeleteOptions): Promise<SingleResponse>
  public abstract findById(opt: FindByIdOptions): Promise<SingleResponse>
  public abstract findByUserId(opt: FindByUserIdOptions): Promise<ListResponse>
  public abstract update(opt: UpdateOptions): Promise<SingleResponse>
}

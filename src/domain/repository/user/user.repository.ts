import { PaginationDto } from '@/domain/dtos'
import { UserEntity } from '@/domain/entities'

export abstract class UserRepository {
  public abstract create(entity: UserEntity): Promise<boolean>
  public abstract delete(userId: string): Promise<boolean>
  public abstract getList(
    pagination: PaginationDto
  ): Promise<UserEntity[] | undefined>
  public abstract findById(userId: string): Promise<UserEntity | undefined>
  public abstract findByEmail(email: string): Promise<UserEntity | undefined>
  public abstract isEmailAvailable(email: string): Promise<boolean>
  public abstract isUsernameAvailable(username: string): Promise<boolean>
  public abstract update(entity: UserEntity): Promise<boolean>
}

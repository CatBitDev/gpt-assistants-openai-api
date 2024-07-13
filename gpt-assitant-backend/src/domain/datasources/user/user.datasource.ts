import { PaginationDto } from '@domain/dtos/shared'
import { RegisterUserDto } from '@domain/dtos/user'
import { UserEntity } from '@domain/entities/user'

export abstract class UserDatasource {
  public abstract register(dto: RegisterUserDto): Promise<UserEntity>
  public abstract delete(userId: string): Promise<UserEntity | undefined>
  public abstract getList(
    pagination: PaginationDto
  ): Promise<{ users: UserEntity[]; pagination: PaginationDto } | undefined>
  public abstract findById(userId: string): Promise<UserEntity | undefined>
  public abstract findByEmail(email: string): Promise<UserEntity | undefined>
  public abstract findByUsername(
    username: string
  ): Promise<UserEntity | undefined>
  public abstract update(entity: UserEntity): Promise<boolean>
}

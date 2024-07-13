import { PaginationDto, RegisterUserDto } from '@/domain/dtos'
import { UserEntity } from '@/domain/entities'

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

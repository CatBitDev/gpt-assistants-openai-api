import { UserDatasource } from '@domain/datasources/user'
import { UserEntity } from '@domain/entities/user'
import { UserRepository } from '@domain/repository/user'
import { RegisterUserDto } from '@domain/dtos/user'
import { RegistryDatasource } from '@infrastructure/datasources/registry.datasource'
import { PaginationDto } from '@domain/dtos/shared'

export class UserRepositoryImpl implements UserRepository {
  private static _instance: UserRepositoryImpl
  private readonly userDatasource: UserDatasource

  private constructor() {
    this.userDatasource = RegistryDatasource.instance.user
  }

  public static get instance(): UserRepositoryImpl {
    if (!UserRepositoryImpl._instance) {
      UserRepositoryImpl._instance = new UserRepositoryImpl()
    }
    return UserRepositoryImpl._instance
  }

  public register(dto: RegisterUserDto): Promise<UserEntity> {
    return this.userDatasource.register(dto)
  }
  public delete(userId: string): Promise<UserEntity | undefined> {
    return this.userDatasource.delete(userId)
  }
  public getList(
    pagination: PaginationDto
  ): Promise<{ users: UserEntity[]; pagination: PaginationDto } | undefined> {
    return this.userDatasource.getList(pagination)
  }
  public findById(userId: string): Promise<UserEntity | undefined> {
    return this.userDatasource.findById(userId)
  }
  public findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userDatasource.findByEmail(email)
  }
  public findByUsername(email: string): Promise<UserEntity | undefined> {
    return this.userDatasource.findByUsername(email)
  }
  public update(entity: UserEntity): Promise<boolean> {
    return this.userDatasource.update(entity)
  }
}

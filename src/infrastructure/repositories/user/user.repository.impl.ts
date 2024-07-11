import { UserDatasource } from '@domain/datasources'
import { UserEntity } from '@/domain/entities'
import { UserRepository } from '@/domain/repository'
import { PaginationDto } from '@/domain/dtos'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  public create(entity: UserEntity): Promise<boolean> {
    return this.userDatasource.create(entity)
  }
  public delete(userId: string): Promise<boolean> {
    return this.userDatasource.delete(userId)
  }
  public getList(pagination: PaginationDto): Promise<UserEntity[] | undefined> {
    return this.userDatasource.getList(pagination)
  }
  public findById(userId: string): Promise<UserEntity | undefined> {
    return this.userDatasource.findById(userId)
  }
  public findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userDatasource.findByEmail(email)
  }
  public isEmailAvailable(email: string): Promise<boolean> {
    return this.userDatasource.isEmailAvailable(email)
  }
  public isUsernameAvailable(username: string): Promise<boolean> {
    return this.userDatasource.isUsernameAvailable(username)
  }
  public update(entity: UserEntity): Promise<boolean> {
    return this.userDatasource.update(entity)
  }
}

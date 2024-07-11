import { UserModel } from '@data/mongo'
import { UserDatasource } from '@/domain/datasources'
import { CreateUserFromModelOptions, UserEntity } from '@/domain/entities'
import { PaginationDto } from '@/domain/dtos'

export class MongoUserDatasource implements UserDatasource {
  public async create(entity: UserEntity): Promise<boolean> {
    const props = MongoUserDatasource.getProps(entity)
    const createdUser = await UserModel.create(props)
    if (createdUser) return true
    return false
  }
  public async delete(userId: string): Promise<boolean> {
    const deletedUser = await UserModel.deleteOne({ id: userId })
    if (deletedUser) return true
    return false
  }
  public async getList(
    pagination: PaginationDto
  ): Promise<UserEntity[] | undefined> {
    const { page, limit } = pagination
    const userList = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit)

    if (!userList) return undefined

    const userEntities = userList.map((user) => {
      return MongoUserDatasource.createEntity(user)
    })

    return userEntities
  }
  public async findById(id: string): Promise<UserEntity | undefined> {
    const user = await UserModel.findOne({ id })
    if (!user) return undefined

    return MongoUserDatasource.createEntity(user)
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await UserModel.findOne({ email })
    if (!user) return undefined

    return MongoUserDatasource.createEntity(user)
  }

  public async isEmailAvailable(email: string): Promise<boolean> {
    return await MongoUserDatasource.checkPropertyIsAvailable({ email })
  }

  public async isUsernameAvailable(username: string): Promise<boolean> {
    return await MongoUserDatasource.checkPropertyIsAvailable({ username })
  }

  public async update(entity: UserEntity): Promise<boolean> {
    const props = MongoUserDatasource.getProps(entity)
    const updatedUser = await UserModel.updateOne({ id: entity.id }, props)
    if (updatedUser) return true
    return false
  }

  private static async checkPropertyIsAvailable(query: {
    [key: string]: any
  }): Promise<boolean> {
    const user = await UserModel.findOne(query)
    if (!user) return true
    return false
  }

  private static getProps(entity: UserEntity) {
    return {
      createdAt: entity.createdAt,
      email: entity.email,
      id: entity.id,
      isEmailValidated: entity.isEmailValidated,
      password: entity.password,
      role: entity.role,
      username: entity.username,
    }
  }

  private static createEntity(response: { [key: string]: any }): UserEntity {
    const { createdAt, id, email, isEmailValidated, password, role, username } =
      response

    return UserEntity.fromModel({
      createdAt,
      id,
      email,
      isEmailValidated,
      password,
      role,
      username,
    })
  }
}

import { UserModel } from '@data/mongo'
import { UserDatasource } from '@/domain/datasources'
import { UserEntity } from '@/domain/entities'
import { PaginationDto, RegisterUserDto } from '@/domain/dtos'
import { UserMapper } from '@/domain/mappers'

export class MongoUserDatasource implements UserDatasource {
  private readonly model

  constructor(private readonly userModel: UserModel) {
    this.model = this.userModel.model
  }

  public async register(dto: RegisterUserDto): Promise<UserEntity> {
    const userEntity = UserMapper.toEntity(dto)
    const props = this.getPropsFromEntity(userEntity)
    const createdUser = await this.model.create(props)

    return this.getEntityFromModel(createdUser)
  }

  public async delete(userId: string): Promise<UserEntity | undefined> {
    const deletedUser = await this.model.deleteOne({ id: userId })
    return this.getEntityFromModel(deletedUser)
  }
  public async getList(
    pagination: PaginationDto
  ): Promise<{ users: UserEntity[]; pagination: PaginationDto } | undefined> {
    const { page, limit } = pagination
    const [total, userList] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit),
    ])

    if (!userList) return undefined

    const userEntities = userList.map((user) => {
      return this.getEntityFromModel(user)
    })

    const paginationDto = PaginationDto.create({
      page,
      limit,
      total,
    })
    return { users: userEntities, pagination: paginationDto }
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    return this.findOne({ _id: id })
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.findOne({ email })
  }

  public async findByUsername(
    username: string
  ): Promise<UserEntity | undefined> {
    return this.findOne({ username })
  }

  public async update(entity: UserEntity): Promise<boolean> {
    const props = this.getPropsFromEntity(entity)
    const updatedUser = await this.model.updateOne({ id: entity.id }, props)
    if (updatedUser) return true
    return false
  }

  private getPropsFromEntity(entity: UserEntity) {
    return {
      createdAt: entity.createdAt,
      email: entity.email,
      isEmailValidated: entity.isEmailValidated,
      password: entity.password,
      role: entity.role,
      username: entity.username,
    }
  }

  private async findOne(options: {
    [key: string]: unknown
  }): Promise<UserEntity | undefined> {
    const user = await this.model.findOne(options)
    if (!user) return undefined

    return this.getEntityFromModel(user)
  }

  private getEntityFromModel(response: { [key: string]: any }): UserEntity {
    const {
      createdAt,
      _id,
      email,
      isEmailValidated,
      password,
      role,
      username,
    } = response

    return UserEntity.fromModel({
      createdAt,
      id: _id.toString(),
      email,
      isEmailValidated,
      password,
      role,
      username,
    })
  }
}

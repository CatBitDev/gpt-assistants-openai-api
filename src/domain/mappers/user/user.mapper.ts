import { ClientUserDto, RegisterUserDto } from '@/domain/dtos'
import { UserEntity } from '@/domain/entities'

export class UserMapper {
  public static toEntity(dto: RegisterUserDto): UserEntity {
    const entity = UserEntity.create({
      email: dto.email,
      isEmailValidated: dto.isEmailValidated,
      password: dto.password,
      role: dto.role,
      username: dto.username,
    })
    return entity
  }

  // public static toCreateUserDto(entity: UserEntity): CreateUserDto {
  //   const dto = CreateUserDto.create({
  //     email: entity.email,
  //     password: entity.password,
  //     username: entity.username,
  //   })
  //   return dto
  // }

  public static toClientUserDto(entity: UserEntity): ClientUserDto {
    const dto = ClientUserDto.create({
      email: entity.email,
      id: entity.id,
      isEmailValidated: entity.isEmailValidated,
      role: entity.role,
      username: entity.username,
    })
    return dto
  }
}

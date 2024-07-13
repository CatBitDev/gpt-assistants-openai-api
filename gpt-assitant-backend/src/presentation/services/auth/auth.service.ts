import { BCryptPlugin, JwtPlugin } from '@config/plugins'
import { ClientUserDto, RegisterUserDto } from '@domain/dtos/user'
import { LoginUserDto } from '@domain/dtos/user/login-user.dto'
import { RequestError } from '@domain/errors'
import { UserMapper } from '@domain/mappers/user'
import { UserRepositoryImpl } from '@infrastructure/repositories/user'

export interface UserTokenPayload {
  id?: string
}

export class AuthService {
  constructor(
    private readonly JWT: JwtPlugin,
    private readonly userRepository: UserRepositoryImpl
  ) {}

  public async registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ user: ClientUserDto; token: string }> {
    const { email, username } = registerUserDto

    const isEmailAvailable = (await this.userRepository.findByEmail(email))
      ? false
      : true
    if (!isEmailAvailable)
      throw RequestError.badRequest('Email already in use.')

    const isUsernameAvailable = (await this.userRepository.findByUsername(
      username
    ))
      ? false
      : true
    if (!isUsernameAvailable)
      throw RequestError.badRequest('Username already in use.')

    // const userEntity = UserMapper.toEntity(registerUserDto)
    const userEntity = await this.userRepository.register(registerUserDto)
    if (!userEntity)
      throw RequestError.internalServerError(
        'Error saving assistant in datasource'
      )

    const clientUserDto = UserMapper.toClientUserDto(userEntity)
    const payload: UserTokenPayload = { id: clientUserDto.id }
    const duration = '1h'
    const token = await this.JWT.generateToken({ payload, duration })

    return { user: clientUserDto, token }
  }

  public async loginUser(
    loginUserDto: LoginUserDto
  ): Promise<{ user: ClientUserDto; token: string }> {
    const { email, password } = loginUserDto

    const userEntity = await this.userRepository.findByEmail(email)
    if (!userEntity) throw RequestError.badRequest('Invalid email or password')

    const isValidPassword = await BCryptPlugin.compare(
      password,
      userEntity.password
    )
    if (!isValidPassword)
      throw RequestError.badRequest('Invalid email or password')

    const clientUserDto = UserMapper.toClientUserDto(userEntity)
    const payload: UserTokenPayload = { id: clientUserDto.id }
    const duration = '1h'
    const token = await this.JWT.generateToken({ payload, duration })

    return { user: clientUserDto, token }
  }
}

import { BCryptPlugin, JwtPlugin } from '@/config/plugins'
import { ClientUserDto, RegisterUserDto } from '@/domain/dtos'
import { LoginUserDto } from '@/domain/dtos/user/login-user.dto'
import { RequestError } from '@/domain/errors'
import { UserMapper } from '@/domain/mappers'
import { UserRepositoryImpl } from '@/infrastructure/repositories'

type Token = { token: string }

export class AuthService {
  constructor(
    private readonly JWT: JwtPlugin,
    private readonly userRepository: UserRepositoryImpl
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto): Promise<Token> {
    const { email, username } = registerUserDto

    const isEmailAvailable = await this.userRepository.isEmailAvailable(email)
    if (!isEmailAvailable)
      throw RequestError.badRequest('Email already in use.')

    const isUsernameAvailable = await this.userRepository.isUsernameAvailable(
      username
    )
    if (!isUsernameAvailable)
      throw RequestError.badRequest('Username already in use.')

    const userEntity = UserMapper.toEntity(registerUserDto)
    const isCreated = await this.userRepository.create(userEntity)
    if (!isCreated)
      throw RequestError.internalServerError(
        'Error saving assistant in datasource'
      )

    const clientUserDto = UserMapper.toClientUserDto(userEntity)
    const payload = { clientUserDto }
    const duration = '1h'
    const token = await this.JWT.generateToken({ payload, duration })

    return { token }
  }

  public async loginUser(loginUserDto: LoginUserDto): Promise<Token> {
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
    const payload = { clientUserDto }
    const duration = '1h'
    const token = await this.JWT.generateToken({ payload, duration })

    return { token }
  }
}

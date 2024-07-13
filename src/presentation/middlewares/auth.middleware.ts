import { NextFunction, Request, Response } from 'express'
import { JwtPlugin, LoggerPlugin } from '@/config/plugins'
import { UserTokenPayload } from '@presentation/services/auth'
import { UserRepositoryImpl } from '@/infrastructure/repositories'
import { UserMapper } from '@/domain/mappers'
import { CustomErrorHandling as err } from '@/domain/errors'

export class AuthMiddleware {
  private constructor(
    private readonly JWT: JwtPlugin,
    private readonly userRepository: UserRepositoryImpl,
    private readonly logger: LoggerPlugin,
    private readonly service: string = 'auth-middleware'
  ) {}

  public static create(
    JWT: JwtPlugin,
    userRepository: UserRepositoryImpl,
    logger: LoggerPlugin
  ): AuthMiddleware {
    return new AuthMiddleware(JWT, userRepository, logger)
  }

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.header('Authorization')
      if (!authorization)
        return res.status(401).json({ error: 'No token provided' })
      if (!authorization?.startsWith('Bearer '))
        return res.status(401).json({ error: 'Invalid Bearer token' })

      const token = authorization.split(' ').at(1) || ''

      const { id } = await this.JWT.validateToken<UserTokenPayload>({ token })
      if (!id) return res.status(401).json({ error: 'Invalid token' })

      const userEntity = await this.userRepository.findById(id)
      if (!userEntity)
        return res.status(401).json({ error: 'Invalid token - User not found' })

      const clientUserDto = UserMapper.toClientUserDto(userEntity)
      req.body.user = clientUserDto
      next()
    } catch (error) {
      const { rawHeaders, originalUrl, method, body } = req
      const reqObj = {
        rawHeaders,
        originalUrl,
        method,
        body,
      }

      const { message, stack } = err.handle(error, res)
      this.logger.http(message, this.service, { reqObj, error: stack })
    }
  }
}

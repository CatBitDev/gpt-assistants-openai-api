import { NextFunction, Request, Response } from 'express'
import {
  JwtPlugin,
  LoggerPlugin,
  UnauthorizedError,
  LogMetadata,
} from '@config/plugins'
import { UserTokenPayload } from '@presentation/services/auth'
import { UserRepositoryImpl } from '@infrastructure/repositories/user'
import { UserMapper } from '@domain/mappers/user'
import { CustomErrorHandling as err } from '@domain/errors'

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

  public failedAuthentication = (
    res: Response,
    reason: string,
    metadata?: LogMetadata
  ) => {
    this.logger.http(
      `User authentication failed: ${metadata?.code || reason}`,
      this.service,
      metadata
    )
    return res.status(401).json({
      error: `User authentication failed: ${reason}`,
    })
  }

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.header('Authorization')
      if (!authorization)
        return this.failedAuthentication(res, 'No token provided')
      if (!authorization?.startsWith('Bearer '))
        return this.failedAuthentication(res, 'Invalid Bearer token')

      const token = authorization.split(' ').at(1) || ''

      const response = await this.JWT.validateToken<
        UserTokenPayload | UnauthorizedError
      >({ token })

      if ('code' in response) {
        return this.failedAuthentication(res, 'Invalid token', { ...response })
      }

      if (!response.id) {
        return this.failedAuthentication(res, 'Invalid token', { ...response })
      }

      const userEntity = await this.userRepository.findById(response.id)
      if (!userEntity)
        return this.failedAuthentication(res, 'User not found', { ...response })

      const clientUserDto = UserMapper.toClientUserDto(userEntity)
      req.body.user = clientUserDto

      next()
    } catch (error) {
      // TODO: move to use-case
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

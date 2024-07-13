import { Router } from 'express'
import { AuthService } from '@/presentation/services/auth'
import { AuthController } from '@presentation/auth/controller'
import { Envs, JwtPlugin, LoggerPlugin } from '@/config/plugins'
import { UserRepositoryImpl } from '@/infrastructure/repositories'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const logger = LoggerPlugin.instance
    const JWT = new JwtPlugin(Envs.JWT_SECRET, logger)
    const userRepository = UserRepositoryImpl.instance
    const authService = new AuthService(JWT, userRepository)
    const controller = new AuthController(authService)

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)

    return router
  }
}

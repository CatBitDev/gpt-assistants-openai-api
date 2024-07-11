import { Router } from 'express'
import { AuthService } from '@/presentation/services/auth'
import { AuthController } from '@presentation/auth/controller'
import { Envs, JwtPlugin } from '@/config/plugins'
import { UserRepositoryImpl } from '@/infrastructure/repositories'
import { DatasourceRegistry } from '@/domain/datasources'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const JWT = new JwtPlugin(Envs.JWT_SECRET)
    const userRepository = new UserRepositoryImpl(
      DatasourceRegistry.instance.user
    )
    const authService = new AuthService(JWT, userRepository)
    const controller = new AuthController(authService)

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)

    return router
  }
}

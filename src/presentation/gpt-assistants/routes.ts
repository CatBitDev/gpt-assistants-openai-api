import { Router } from 'express'
import {
  AssistantsRoutes,
  ThreadsRoutes,
  MessagesRoutes,
  RunsRoutes,
} from '@presentation/gpt-assistants'
import {
  OpenAiClientPlugin,
  Envs,
  JwtPlugin,
  LoggerPlugin,
} from '@config/plugins'
import { UserRepositoryImpl } from '@/infrastructure/repositories'
import { AuthMiddleware } from '@presentation/middlewares'

export class GptAssistantsRoutes {
  static get routes() {
    const router = Router()

    const openaiClient = OpenAiClientPlugin.create({
      apiKey: Envs.OPENAI_API_KEY,
    })

    const logger = LoggerPlugin.instance

    const JWT = new JwtPlugin(Envs.JWT_SECRET, logger)
    const userRepository = UserRepositoryImpl.instance
    const authMiddleware = AuthMiddleware.create(JWT, userRepository, logger)

    router.use(authMiddleware.authenticate)
    router.use('/assistants', AssistantsRoutes.routes(openaiClient))
    router.use('/threads', ThreadsRoutes.routes(openaiClient))
    router.use('/messages', MessagesRoutes.routes(openaiClient))
    router.use('/runs', RunsRoutes.routes(openaiClient))

    return router
  }
}

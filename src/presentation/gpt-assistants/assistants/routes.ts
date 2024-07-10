import { Router } from 'express'
import { OpenAiClientPlugin } from '@config/plugins'
import { AssistantsController } from '@presentation/gpt-assistants/'
import { AssistantService } from '@presentation/services/gpt-assistants'
import { MongoAssistantDatasource } from '@infrastructure/datasources/mongo'
import { AssistantRepositoryImpl } from '@infrastructure/repositories'

export class AssistantsRoutes {
  static routes(openaiClient: OpenAiClientPlugin) {
    const router = Router()

    const assistantDatasource = new MongoAssistantDatasource()
    const assistantRepository = new AssistantRepositoryImpl(assistantDatasource)
    const assistantService = new AssistantService(
      openaiClient,
      assistantRepository
    )
    const controller = new AssistantsController(assistantService)

    router.post('/', controller.createAssistant)
    router.get('/', controller.getAssistantsList)
    router.put('/:id', controller.updateAssistantById)
    router.delete('/:id', controller.deleteAssistantById)

    return router
  }
}

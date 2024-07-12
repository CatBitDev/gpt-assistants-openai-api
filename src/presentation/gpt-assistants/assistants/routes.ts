import { Router } from 'express'
import { OpenAiClientPlugin } from '@config/plugins'
import { AssistantsController } from '@presentation/gpt-assistants/'
import { AssistantService } from '@presentation/services/gpt-assistants'
import { AssistantRepositoryImpl } from '@infrastructure/repositories'

export class AssistantsRoutes {
  static routes(openaiClient: OpenAiClientPlugin) {
    const router = Router()

    const assistantRepository = AssistantRepositoryImpl.instance
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

import { Request, Response } from 'express'
import { AssistantService } from '@presentation/services/gpt-assistants'
import { CreateAssistantDto } from '@domain/dtos/gpt-assistants'
import { CustomErrorHandling as err } from '@domain/errors'

export class AssistantsController {
  constructor(private readonly assistantService: AssistantService) {}

  public createAssistant = (req: Request, res: Response) => {
    const createAssistantDto = () => {
      try {
        return CreateAssistantDto.create(req.body)
      } catch (error) {
        err.handle(error, res)
      }
    }

    const assistantDto = createAssistantDto()!
    this.assistantService
      .createAssistant(assistantDto, req.body.user)
      .then((assistant) => {
        res.status(201).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public getAssistantsList = (req: Request, res: Response) => {}

  public updateAssistantById = (req: Request, res: Response) => {}

  public deleteAssistantById = (req: Request, res: Response) => {}
}

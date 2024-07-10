import { Request, Response } from 'express'
import { AssistantService } from '@presentation/services/gpt-assistants'
import { AssistantDto } from '@domain/dtos'
import { CustomErrorHandling as err } from '@domain/errors'

export class AssistantsController {
  constructor(private readonly assistantService: AssistantService) {}

  public createAssistant = async (req: Request, res: Response) => {
    const createAssistantDto = () => {
      try {
        return AssistantDto.create(req.body)
      } catch (error) {
        err.handle(error, res)
      }
    }

    this.assistantService
      .createAssistant(createAssistantDto()!)
      .then((assistant) => {
        res.status(201).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public getAssistantsList = async (req: Request, res: Response) => {}

  public updateAssistantById = async (req: Request, res: Response) => {}

  public deleteAssistantById = async (req: Request, res: Response) => {}
}

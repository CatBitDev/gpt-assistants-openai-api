import { Request, Response } from 'express'
import { AssistantService } from '@presentation/services/gpt-assistants'
import { CreateAssistantDto } from '@domain/dtos/gpt-assistants'
import { CustomErrorHandling as err } from '@domain/errors'
import { PaginationDto } from '@/domain/dtos/shared'
import { assess } from '@/domain/variable-validator'
import { LoggerPlugin } from '@/config/plugins'

export class AssistantsController {
  constructor(
    private readonly assistantService: AssistantService,
    private readonly logger: LoggerPlugin = LoggerPlugin.instance,
    private readonly service: string = 'assistants-controller'
  ) {}

  private createAssistantDto = (req: Request, res: Response) => {
    try {
      return CreateAssistantDto.create(req.body)
    } catch (error) {
      this.errorHandling(error, res)
    }
  }

  private createPaginationDto = (req: Request, res: Response) => {
    try {
      return PaginationDto.create(req.query)
    } catch (error) {
      this.errorHandling(error, res)
    }
  }

  private getAssistantId = (req: Request, res: Response) => {
    try {
      return assess({ id: req.params.id }).asString()
    } catch (error) {
      this.errorHandling(error, res)
    }
  }

  private errorHandling = (error: unknown, res: Response) => {
    const response = err.handle(error, res)
    this.logger.error(`${error}`, this.service, response)
  }

  public createAssistant = (req: Request, res: Response) => {
    const assistantDto = this.createAssistantDto(req, res)!
    this.assistantService
      .createAssistant(assistantDto, req.body.user)
      .then((assistant) => {
        res.status(201).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public getAssistantById = (req: Request, res: Response) => {
    const assistantId = this.getAssistantId(req, res)!
    this.assistantService
      .getAssistantById(assistantId, req.body.user)
      .then((assistant) => {
        res.status(200).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public getAssistantsList = (req: Request, res: Response) => {
    const paginationDto = this.createPaginationDto(req, res)!

    this.assistantService
      .getAssistantsList(paginationDto, req.body.user)
      .then((assistant) => {
        res.status(201).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public updateAssistantById = (req: Request, res: Response) => {
    const assistantDto = this.createAssistantDto(req, res)!
    const assistantId = this.getAssistantId(req, res)!

    this.assistantService
      .updateAssistantById(assistantId, assistantDto, req.body.user)
      .then((assistant) => {
        res.status(201).json(assistant)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public deleteAssistantById = (req: Request, res: Response) => {
    const assistantId = this.getAssistantId(req, res)!
    this.assistantService
      .deleteAssistantById(assistantId, req.body.user)
      .then(() => {
        res.status(204).json()
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }
}

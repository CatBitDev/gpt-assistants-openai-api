import { UUID } from '@config/plugins'
import { RoleType } from '@domain/entities'
import { VariableValidatorError } from '@domain/errors'
import { assess } from '@domain/variable-validator'

export interface CreateMessageDtoOptions {
  content: string
  openaiId?: string
  openaiThreadId?: string
  role: RoleType
  threadId: string
}

export class MessageDto {
  private constructor(
    public readonly content: string,
    public readonly createdAt: number,
    public readonly id: string,
    public readonly openaiId: string,
    public readonly openaiThreadId: string,
    public readonly role: RoleType,
    public readonly threadId: string
  ) {}

  public static create(options: CreateMessageDtoOptions) {
    let {
      role,
      openaiId = '',
      openaiThreadId = '',
      content,
      threadId,
    } = options
    const id = UUID.nano()
    const createdAt = Date.now()

    assess({ role }).asString()
    if (!['assistant', 'user'].includes(role))
      throw VariableValidatorError.invalidValue('role', role)

    content = assess({ content }).asString()
    threadId = assess({ threadId }).asString()

    return new MessageDto(
      content,
      createdAt,
      id,
      openaiId,
      openaiThreadId,
      role,
      threadId
    )
  }
}

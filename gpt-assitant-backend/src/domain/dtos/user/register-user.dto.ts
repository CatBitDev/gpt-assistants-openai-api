import { UserRoles } from '@domain/entities/user'
import { assess } from '@domain/variable-validator'
import { VariableValidatorError as VarError } from '@/domain/errors'

export interface CreateRegisterUserDtoParams {
  email: string
  password: string
  username: string
}

export class RegisterUserDto {
  constructor(
    public readonly email: string,
    public readonly isEmailValidated: boolean,
    public readonly password: string,
    public readonly role: UserRoles[],
    public readonly username: string
  ) {}

  public static create(options: CreateRegisterUserDtoParams): RegisterUserDto {
    let { email, password, username } = options

    // Check password blank spaces here to avoid string trimming
    const BLANK_SPACE_REGEX = /(?=.* )/
    if (BLANK_SPACE_REGEX.test(password!))
      throw VarError.assessmentError('Password should not contain blank spaces')

    email = assess({ email }).asEmailString()
    password = assess({ password }).asPasswordString()
    username = assess({ username }).asUsernameString()

    return new RegisterUserDto(email, false, password, ['USER'], username)
  }
}

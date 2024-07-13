import { UserRoles } from '@domain/entities/user'
import { assess } from '@domain/variable-validator'

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

    email = assess({ email }).asEmailString()
    password = assess({ password }).asPasswordString()
    username = assess({ username }).asUsernameString()

    return new RegisterUserDto(email, false, password, ['USER'], username)
  }
}

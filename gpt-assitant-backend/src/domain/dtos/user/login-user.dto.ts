import { assess } from '@domain/variable-validator'

export interface CreateLoginUserDtoParams {
  email: string
  password: string
}

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(options: CreateLoginUserDtoParams): LoginUserDto {
    let { email, password } = options

    email = assess({ email }).asEmailString()
    password = assess({ password }).asPasswordString()

    return new LoginUserDto(email, password)
  }
}

import { UserRoles } from '@/domain/entities'

export interface CreateClientUserDtoParams {
  email: string
  id: string
  isEmailValidated: boolean
  role: UserRoles[]
  username: string
}
// No debe revelar el password
export class ClientUserDto {
  constructor(
    public readonly email: string,
    public readonly id: string,
    public readonly isEmailValidated: boolean,
    public readonly role: UserRoles[],
    public readonly username: string
  ) {}

  public static create(options: CreateClientUserDtoParams): ClientUserDto {
    const { email, id, isEmailValidated, role, username } = options

    return new ClientUserDto(email, id, isEmailValidated, role, username)
  }
}

import { BCryptPlugin, UUID } from '@/config/plugins'

export interface CreateUserEntityOptions {
  email: string
  isEmailValidated: boolean
  password: string
  role: UserRoles[]
  username: string
}

export interface CreateUserFromModelOptions {
  createdAt: number
  id: string
  email: string
  isEmailValidated: boolean
  password: string
  role: UserRoles[]
  username: string
}

export type UserRoles = 'ADMIN' | 'USER'

export class UserEntity {
  private constructor(
    private readonly _createdAt: number,
    private readonly _id: string,
    private _email: string,
    private _isEmailValidated: boolean,
    private _password: string,
    private _role: UserRoles[],
    private _username: string
  ) {}

  public static create(options: CreateUserEntityOptions): UserEntity {
    const createdAt = new Date().getTime()
    const id = UUID.nano()
    const { email, isEmailValidated, password, role, username } = options

    const hashedPassword = BCryptPlugin.hash(password)
    return new UserEntity(
      createdAt,
      id,
      email,
      isEmailValidated,
      hashedPassword,
      role,
      username
    )
  }

  public static fromModel(options: CreateUserFromModelOptions): UserEntity {
    const { createdAt, id, email, isEmailValidated, password, role, username } =
      options

    return new UserEntity(
      createdAt,
      id,
      email,
      isEmailValidated,
      password,
      role,
      username
    )
  }

  public get createdAt(): number {
    return this._createdAt
  }

  public get id(): string {
    return this._id
  }

  public get email(): string {
    return this._email
  }

  public get isEmailValidated(): boolean {
    return this._isEmailValidated
  }

  public get password(): string {
    return this._password
  }

  public get role(): UserRoles[] {
    return this._role
  }

  public get username(): string {
    return this._username
  }
}

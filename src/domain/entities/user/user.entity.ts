// import { CreateUserDto } from '../../dtos'

// interface UserFromObjectOptions {
//   readonly id: string
//   readonly username: string
//   readonly password: string
//   readonly email: string
//   readonly isEmailValidated: boolean
//   readonly createdAt: number
//   readonly role: string[]
// }

// export class UserEntity {
//   private constructor(
//     public readonly createdAt: number,
//     public readonly email: string,
//     public readonly id: string,
//     public readonly isEmailValidated: boolean,
//     public readonly password: string,
//     public readonly role: string[],
//     public readonly username: string
//   ) {}

//   static create(options: UserFromObjectOptions): UserEntity {
//     const { id, username, password, email, isEmailValidated, createdAt, role } =
//       options
//     return new UserEntity(
//       createdAt,
//       email,
//       id,
//       isEmailValidated,
//       password,
//       role,
//       username
//     )
//   }
// }

// import { DtoValidator as dto } from "../../dto-validator/dto-validator"

// export class CreateUserDto {
//   constructor(
//     public readonly id: string,
//     public readonly username: string,
//     public readonly password: string,
//     public readonly email: string,
//     public readonly isEmailValidated: boolean,
//     public readonly createdAt: number,
//     public readonly role: string[]
//   ) { }

//   public static create(object: { [key: string]: any }): CreateUserDto {
//     const { id, username, password, email, isEmailValidated, createdAt, role } = object

//     dto.assess({ value: id, origin: 'id' }).asString()
//     dto.assess({ value: username, origin: 'username' }).asString()
//     dto.assess({ value: password, origin: 'password' }).asString()
//     dto.assess({ value: email, origin: 'email' }).asString()
//     dto.assess({ value: isEmailValidated, origin: 'isEmailValidated' }).asBoolean()
//     dto.assess({ value: createdAt, origin: 'createdAt' }).asNumber()
//     dto.assess({ value: role, origin: 'role' }).asArray()

//     return new CreateUserDto(id, username, password, email, isEmailValidated, createdAt, role)
//   }
// }

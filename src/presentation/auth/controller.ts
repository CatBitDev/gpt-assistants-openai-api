import { Request, Response } from 'express'
import { CustomErrorHandling as err } from '@/domain/errors'
import { RegisterUserDto } from '@/domain/dtos'
import { AuthService } from '@presentation/services/auth'
import { LoginUserDto } from '@/domain/dtos/user/login-user.dto'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public registerUser = (req: Request, res: Response) => {
    const registerUserDto = () => {
      try {
        return RegisterUserDto.create(req.body)
      } catch (error) {
        err.handle(error, res)
      }
    }

    this.authService
      .registerUser(registerUserDto()!)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }

  public loginUser = (req: Request, res: Response) => {
    const loginUserDto = () => {
      try {
        return LoginUserDto.create(req.body)
      } catch (error) {
        err.handle(error, res)
      }
    }

    this.authService
      .loginUser(loginUserDto()!)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        err.handle(error, res)
      })
  }
}

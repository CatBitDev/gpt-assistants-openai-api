import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export class BCryptPlugin {
  public static hash(password: string) {
    const salt = genSaltSync()
    return hashSync(password, salt)
  }

  public static compare(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword)
  }
}

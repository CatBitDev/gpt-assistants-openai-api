import { VariableValidatorError as VarError } from '@/domain/errors'

export const asString = (value: unknown): [error?: string, result?: string] => {
  if (typeof value !== 'string') return ['is not a string']
  return [undefined, value]
}

export const asEmailString = (
  value: unknown
): [error?: string, result?: string] => {
  const [error, emailString] = asString(value)

  if (error) return [error]

  const EMAIL_REGEX =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/

  if (!EMAIL_REGEX.test(emailString!)) return ['should be a valid email adress']
  return [undefined, emailString]
}

export const asPasswordString = (
  value: unknown
): [error?: string, result?: string] => {
  const [error, passwordString] = asString(value)

  if (error) throw VarError.assessmentError('Password should be a string')

  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!PASSWORD_REGEX.test(passwordString!))
    throw VarError.assessmentError('Password should be a valid password')

  return [undefined, passwordString]
}

export const asUsernameString = (
  value: unknown
): [error?: string, result?: string] => {
  const [error, usernameString] = asString(value)

  if (error) return [error]

  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/
  if (!USERNAME_REGEX.test(usernameString!))
    return ['should be a valid username']

  return [undefined, usernameString]
}

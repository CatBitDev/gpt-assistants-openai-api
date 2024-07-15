import { VariableValidatorError as VarError } from '@domain/errors'

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

// This function throws an error to avoid sending the password in client response
export const asPasswordString = (
  value: unknown
): [error?: string, result?: string] => {
  const [error, passwordString] = asString(value)

  if (error) throw VarError.assessmentError('Password should be a string')

  /**
   * At least one lowercase letter (?=.*[a-z])
   * At least one uppercase letter (?=.*[A-Z])
   * At least one digit (?=.*[0-9])
   * At least one special character  (?=.*\W)
   * No blank spaces (?!.* )
   * Minimum 8 characters .{8,32}
   */
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/
  if (PASSWORD_REGEX.test(passwordString!)) return [undefined, passwordString]

  const LOWERCASE_REGEX = /(?=.*[a-z])/
  const UPPERCASE_REGEX = /(?=.*[A-Z])/
  const DIGIT_REGEX = /(?=.*[0-9])/
  const SPECIAL_CHAR_REGEX = /(?=.*\W)/
  const MIN_LENGTH_REGEX = /.{8,32}/

  let invalidPasswordMessage =
    'Invalid password missing the following parameters: '
  const missingParams = []
  if (!LOWERCASE_REGEX.test(passwordString!))
    missingParams.push('one lowercase letter')

  if (!UPPERCASE_REGEX.test(passwordString!))
    missingParams.push('one uppercase letter')

  if (!DIGIT_REGEX.test(passwordString!)) missingParams.push('one digit')

  if (!SPECIAL_CHAR_REGEX.test(passwordString!))
    missingParams.push('one special character')

  if (!MIN_LENGTH_REGEX.test(passwordString!))
    missingParams.push('minimum 8 characters')

  invalidPasswordMessage += missingParams.join(', ')

  throw VarError.assessmentError(invalidPasswordMessage)
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

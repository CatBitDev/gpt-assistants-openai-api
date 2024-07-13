export const asInt = (value: unknown): [error?: string, result?: number] => {
  if (typeof value === 'number') return [undefined, value]
  if (typeof value !== 'string') return ['should be a valid integer']

  const number = parseInt(value)
  if (isNaN(number) || number.toString(10) !== value)
    return ['should be a valid integer']

  return [undefined, number]
}

export const asIntPositive = (
  value: unknown
): [error?: string, result?: number] => {
  const [error, number] = asInt(value)
  if (error) return [error]
  if (number! < 0) return ['should be a positive integer']

  return [undefined, number]
}

export const asIntNegative = (
  value: unknown
): [error?: string, result?: number] => {
  const [error, number] = asInt(value)
  if (error) return [error]
  if (number! > 0) return ['should be a positive integer']

  return [undefined, number]
}

export const asPortNumber = (
  value: unknown
): [error?: string, result?: number] => {
  const [error, number] = asIntPositive(value)

  if (error) return [error]
  if (number! > 65535) return ['cannot assign a port number greater than 65535']

  return [undefined, number]
}

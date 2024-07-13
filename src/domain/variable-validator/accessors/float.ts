export const asFloat = (value: unknown): [error?: string, result?: number] => {
  if (typeof value === 'number') return [undefined, value]
  if (typeof value !== 'string') return ['should be a valid float']

  const number = parseFloat(value)
  if (isNaN(number)) return ['should be a valid float']

  return [undefined, number]
}

export const asFloatPositive = (
  value: unknown
): [error?: string, result?: number] => {
  const [error, number] = asFloat(value)
  if (error) return [error]
  if (number! < 0) return ['should be a positive float']

  return [undefined, number]
}

export const asFloatNegative = (
  value: unknown
): [error?: string, result?: number] => {
  const [error, number] = asFloat(value)
  if (error) return [error]
  if (number! > 0) return ['should be a negative float']

  return [undefined, number]
}

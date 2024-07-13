export const asBool = (value: unknown): [error?: string, result?: boolean] => {
  if (typeof value === 'boolean') return [undefined, value]
  if (typeof value !== 'string' && typeof value !== 'number')
    return ['should be either "true", "false", 1, or 0']

  const allowedValues: { [key: string]: boolean } = {
    true: true,
    false: false,
    '1': true,
    '0': false,
  }
  const result = allowedValues[value.toString().toLowerCase()]
  if (typeof result === 'undefined')
    return ['should be either "true", "false", 1, or 0']
  return [undefined, result]
}

export const asBoolStrict = (
  value: unknown
): [error?: string, result?: boolean] => {
  if (typeof value === 'boolean') return [undefined, value]
  if (typeof value !== 'string') return ['should be either "true" or "false"']
  const result = value.toLowerCase()
  return [undefined, result === 'true']
}

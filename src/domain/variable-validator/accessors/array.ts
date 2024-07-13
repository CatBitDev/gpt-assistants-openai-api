export const asArray = (
  value: unknown
): [error?: string, result?: Array<unknown>] => {
  if (!Array.isArray(value)) return ['should be an array']
  return [undefined, value]
}

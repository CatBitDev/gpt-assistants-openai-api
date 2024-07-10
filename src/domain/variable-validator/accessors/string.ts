export const asString = (value: unknown): [error?: string, result?: string] => {
  if (typeof value !== 'string') return ['is not a string']
  return [undefined, value]
}

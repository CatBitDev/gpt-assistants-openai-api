export const asSet = (
  value: unknown
): [error?: string, result?: Set<unknown>] => {
  if (!Array.isArray(value)) return ['should be a Set']
  return [undefined, new Set(value)]
}

export class VariableValidatorError extends Error {
  private constructor(public readonly message: string) {
    super(message)
  }

  static invalidValue(varName: string, varValue: any) {
    return new VariableValidatorError(
      `Invalid value for variable ${varName}: ${varValue}`
    )
  }

  static assessmentError(message: string) {
    return new VariableValidatorError(message)
  }
}

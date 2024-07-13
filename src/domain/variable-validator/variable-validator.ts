import { VariableValidatorError } from '@domain/errors'
import {
  variableAccessors as accessors,
  IVariableAccessors,
} from '@domain/variable-validator/accessors'

interface CreateAccessorOptions {
  accessor: { [key: string]: any }
  isRequired: boolean
  varDefaultValue: unknown
  varName: string
  varValue: unknown
}

interface AssessVariableEmptyOptions {
  varValue: unknown
  varDefaultValue: unknown
  isRequired: boolean
}

interface AssessOptions {
  [key: string]: unknown
  default?: unknown
  required?: boolean
}

export const assess = (options: AssessOptions): IVariableAccessors => {
  return VariableValidator.assess(options)
}

class VariableValidator {
  static assess(options: AssessOptions): IVariableAccessors {
    const {
      default: varDefaultValue = undefined,
      required: isRequired = true,
    } = options
    const entries = Object.entries(options)

    const [varName, varValue] = entries.filter(([key, value]) => {
      if (key !== 'default' && key !== 'required') return [key, value]
    })[0] as [string, unknown]

    const variableAccessors: { [key: string]: any } = {}

    Object.entries({ ...accessors }).forEach(([name, accessor]) => {
      const options = {
        accessor,
        isRequired,
        varDefaultValue,
        varName,
        varValue,
      }

      variableAccessors[name] = VariableValidator.createAccessor(options)
    })

    return variableAccessors as IVariableAccessors
  }

  private static assessVariableEmpty(
    options: AssessVariableEmptyOptions
  ): [error?: string, result?: unknown] {
    const { varValue, varDefaultValue, isRequired } = options

    const checkIsEmpty = (value: unknown): boolean => {
      if (typeof value === 'undefined' || value === null) return true
      if (typeof value === 'string') {
        if (value.trim().length === 0) return true
      }

      return false
    }

    const isVarValueEmpty = checkIsEmpty(varValue)
    const isVarDefaultValueEmpty = checkIsEmpty(varDefaultValue)

    if (isVarValueEmpty) {
      if (!isVarDefaultValueEmpty) return [undefined, varDefaultValue]
      if (!isRequired) return [undefined, undefined]
      return [`is required, but its value was empty`]
    }

    return [undefined, varValue]
  }

  private static createAccessor(options: CreateAccessorOptions) {
    return function () {
      const { accessor, isRequired, varDefaultValue, varName, varValue } =
        options

      try {
        const [emptyError, value] = VariableValidator.assessVariableEmpty({
          varValue,
          varDefaultValue,
          isRequired,
        })

        if (emptyError)
          throw VariableValidatorError.assessmentError(
            `${varName} ${emptyError}`
          )
        if (value === undefined) return value

        const [assessError, result] = accessor.apply(accessor, [value])

        if (assessError)
          throw VariableValidatorError.assessmentError(
            `${varName}: ${value} ${assessError}`
          )

        return result
      } catch (error) {
        throw error
      }
    }
  }
}

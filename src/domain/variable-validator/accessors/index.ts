import { asArray } from '@domain/variable-validator/accessors/array'
import { asSet } from '@domain/variable-validator/accessors/set'
import { asBool, asBoolStrict } from '@domain/variable-validator/accessors/bool'
import {
  asInt,
  asIntPositive,
  asIntNegative,
  asPortNumber,
} from '@domain/variable-validator/accessors/int'
import { asString } from '@domain/variable-validator/accessors/string'

export interface IVariableAccessors {
  asPortNumber: () => number
  asInt: () => number
  asIntPositive: () => number
  asIntNegative: () => number
  asBool: () => boolean
  asBoolStrict: () => boolean
  asString: () => string
  asArray: () => any[]
  asSet: () => Set<any>
}

export const variableAccessors = {
  asBool,
  asBoolStrict,
  asInt,
  asIntPositive,
  asIntNegative,
  asPortNumber,
  asString,
  asArray,
  asSet,
}

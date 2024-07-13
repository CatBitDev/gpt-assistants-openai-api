import { asArray } from '@domain/variable-validator/accessors/array'
import { asSet } from '@domain/variable-validator/accessors/set'
import { asBool, asBoolStrict } from '@domain/variable-validator/accessors/bool'
import {
  asInt,
  asIntPositive,
  asIntNegative,
  asPortNumber,
} from '@domain/variable-validator/accessors/int'
import {
  asFloat,
  asFloatPositive,
  asFloatNegative,
} from '@domain/variable-validator/accessors/float'
import {
  asString,
  asPasswordString,
  asEmailString,
  asUsernameString,
} from '@domain/variable-validator/accessors/string'

export interface IVariableAccessors {
  asArray: () => any[]
  asBool: () => boolean
  asBoolStrict: () => boolean
  asFloat: () => number
  asFloatNegative: () => number
  asFloatPositive: () => number
  asInt: () => number
  asIntNegative: () => number
  asIntPositive: () => number
  asPortNumber: () => number
  asSet: () => Set<any>
  asString: () => string
  asPasswordString: () => string
  asEmailString: () => string
  asUsernameString: () => string
}

export const variableAccessors = {
  asArray,
  asBool,
  asBoolStrict,
  asFloat,
  asFloatNegative,
  asFloatPositive,
  asInt,
  asIntNegative,
  asIntPositive,
  asPortNumber,
  asSet,
  asString,
  asPasswordString,
  asEmailString,
  asUsernameString,
}

import {
  getMessage,
  IValidationRuleParams,
  TValidationRule,
  TValidationRuleResult,
  TValidationRuleWrapper,
  TValidationRuleWrapperParams,
} from './index';

/**
 * required
 * @description Required validation rule. If otherValue is passed, it will be used instead of value
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const required: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field is required',
    ...params
  }
  const {
    otherValue = null
  } = params
  return function required({ value }: IValidationRuleParams): TValidationRuleResult {
    const target = otherValue !== null ? otherValue : value
    return !!target || getMessage(params)
  }
}

/**
 * onlyLetters
 * @description Only letters validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const onlyLetters: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must contain only letters',
    ...params
  }
  return ({ value, required }: IValidationRuleParams): TValidationRuleResult => {
    const matches = required ? /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(value) : /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value)
    return matches || getMessage(params)
  }
}

/**
 * onlyNumbers
 * @description Only numbers validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const onlyNumbers: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must contain only numbers',
    ...params
  }
  return ({ value, required }: IValidationRuleParams): TValidationRuleResult => {
    const matches = required ? /^[0-9]+$/.test(value) : /^[0-9]*$/.test(value)
    return matches || getMessage(params)
  }
}

/**
 * minLength
 * @description Min length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const minLength: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must contain at least {min} characters',
    min: 3,
    ...params
  }
  const {
    min
  } = params
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    return (value.length >= min) || getMessage(params)
  }
}

/**
 * maxLength
 * @description Max length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const maxLength: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must contain at most {max} characters',
    max: 10,
    ...params
  }
  const {
    max
  } = params
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    return (value.length <= max) || getMessage(params)
  }
}

/**
 * maxLength
 * @description Max length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value, formValues}: {value: any, formValues?: any}) => boolean | string}
 */
export const matches: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must match "{field}" field',
    ...params
  }
  const {
    field
  } = params
  return ({value, formValues}: IValidationRuleParams): TValidationRuleResult => {
    const matches = value === formValues[field]
    return matches || getMessage(params)
  }
}

/**
 * pattern
 * @description Pattern validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const pattern: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field is not valid',
    ...params
  }
  const {
    pattern
  } = params
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    const matches = pattern.test(value)
    return matches || getMessage(params)
  }
}

/**
 * isEmail
 * @description Email validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const isEmail: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must be a valid email',
    ...params
  }
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    return pattern({
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      ...params
    })({ value })
  }
}

/**
 * isTrue
 * @description True validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => TValidationRuleResult}
 */
export const isTrue: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must be true',
    ...params
  }
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    return value === true || getMessage(params)
  }
}

/**
 * isFalse
 * @description False validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => TValidationRuleResult}
 */
export const isFalse: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must be false',
    ...params
  }
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    return value === false || getMessage(params)
  }
}

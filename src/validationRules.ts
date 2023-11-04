import {
  getMessage,
  TValidationRule,
  TValidationRuleResult,
  TValidationRuleWrapperParams,
} from './index';

/**
 * required
 * @description Required validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const required = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field is required',
    ...params
  }
  const {
    special = null
  } = _params
  const required = ({ value }: { value: any }): TValidationRuleResult => {
    const isRequired = special !== null ? special : value
    return !!isRequired || getMessage(_params)
  }
  return required
}

/**
 * onlyLetters
 * @description Only letters validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const onlyLetters = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must contain only letters',
    required: true,
    ...params
  }
  const {
    required
  } = _params
  return ({ value }: { value: any }): TValidationRuleResult => {
    const matches = required ? /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(value) : /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value)
    return matches || getMessage(_params)
  }
}

/**
 * onlyNumbers
 * @description Only numbers validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const onlyNumbers = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must contain only numbers',
    required: true,
    ...params
  }
  const {
    required
  } = _params
  return ({ value }: { value: any }): TValidationRuleResult => {
    const matches = required ? /^[0-9]+$/.test(value) : /^[0-9]*$/.test(value)
    return matches || getMessage(_params)
  }
}

/**
 * minLength
 * @description Min length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const minLength = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must contain at least {min} characters',
    min: 3,
    ...params
  }
  const {
    min
  } = _params
  return ({ value }: { value: any }): TValidationRuleResult => {
    return (value.length >= min) || getMessage(_params)
  }
}

/**
 * maxLength
 * @description Max length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
export const maxLength = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must contain at most {max} characters',
    max: 10,
    ...params
  }
  const {
    max
  } = _params
  return ({ value }: { value: any }): TValidationRuleResult => {
    return (value.length <= max) || getMessage(_params)
  }
}

/**
 * maxLength
 * @description Max length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value, formValues}: {value: any, formValues?: any}) => boolean | string}
 */
export const matches = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must match "{field}" field',
    ...params
  }
  const {
    field
  } = _params
  return ({value, formValues}: { value: any, formValues?: any }): TValidationRuleResult => {
    const matches = value === formValues[field]
    return matches || getMessage(_params)
  }
}

/**
 * pattern
 * @description Pattern validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const pattern = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field is not valid',
    ...params
  }
  const {
    pattern
  } = _params
  return ({ value }: { value: any }): TValidationRuleResult => {
    const matches = pattern.test(value)
    return matches || getMessage(_params)
  }
}

/**
 * isEmail
 * @description Email validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
export const isEmail = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must be a valid email',
    ...params
  }
  return pattern({
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    ..._params
  })
}

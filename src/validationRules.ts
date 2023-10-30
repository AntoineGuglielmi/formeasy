import {
  getMessage,
  TValidationRuleWrapperParams,
} from '../src';

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
  return ({ value }: { value: any }) => {
    const isRequired = special !== null ? special : value
    return !!isRequired || getMessage(_params)
  }
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
  return ({ value }: { value: any }) => {
    const matches = required ? /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(value) : /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value)
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
  return ({ value }: { value: any }) => {
    return (value.length >= min) || getMessage(_params)
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
  return ({value, formValues}: { value: any, formValues?: any }) => {
    const matches = value === formValues[field]
    return matches || getMessage(_params)
  }
}

export const pattern = (params: TValidationRuleWrapperParams = {}) => {
  const _params: TValidationRuleWrapperParams = {
    message: 'This field is not valid',
    ...params
  }
  const {
    pattern
  } = _params
  return ({ value }: { value: any }) => {
    const matches = pattern.test(value)
    return matches || getMessage(_params)
  }
}

import {
  TFormCollection,
  TFormValues,
  TValidationRuleWrapperParams
} from './types';

export const getMessage = (params: TValidationRuleWrapperParams) => {
  const {
    message,
    ...rest
  } = params
  return Object.entries(rest).reduce((finalMessage: string, [key, value]: [string, any]): string => {
    return finalMessage.replace(`{${key}}`, value)
  }, message)
}

export const getFormValues = (form: TFormCollection): TFormValues => {
  return Object.entries(form).reduce((acc: TFormValues, [name, { value }]) => {
    acc[name] = value
    return acc
  }, {})
}


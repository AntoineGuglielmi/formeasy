import { TFormCollection } from './types'

export const getMessage = (params: Record<string, any>) => {
  const {
    message,
    ...rest
  } = params
  return Object.entries(rest).reduce((finalMessage: string, [key, value]: [string, any]): string => {
    return finalMessage.replace(`{${key}}`, value)
  }, message)
}

export const getFormValues = (form: TFormCollection): Record<string, any> => {
  return Object.entries(form).reduce((acc: Record<string, any>, [name, { value }]) => {
    acc[name] = value
    return acc
  }, {})
}


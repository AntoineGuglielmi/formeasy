export interface IForm {
  value: string
  validationRules?: TValidationRulesCollection
}

export type TFormCollection = Record<string, IForm>

export type TValidationRulesCollection = Array<TValidationRule>

export type TValidationRuleWrapper = (params?: Record<string, any>) => TValidationRule
export type TValidationRuleWrapperParams = Record<string, any>

export type TValidationRule = ({ value, formValues }: { value: any, formValues: any }) => boolean | string

export type TErrorsCollection = Record<string, TErrorMessagesCollection>
export type TErrorMessagesCollection = Array<TErrorMessage>
export type TErrorMessage = string


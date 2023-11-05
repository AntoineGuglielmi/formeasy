export interface IForm {
  value: string
  validationRules?: TValidationRulesCollection
}

export type TFormValues = Record<string, any>

export type TFormCollection = Record<string, IForm>

export type TValidationRulesCollection = Array<TValidationRule>

export type TValidationRuleWrapper = (params?: TValidationRuleWrapperParams) => TValidationRule
export type TValidationRuleWrapperParams = Record<string, any>

export interface IValidationRuleParams {
  value: any
  formValues?: any
  required?: boolean
}
export type TValidationRule = ({ value, formValues, required }: IValidationRuleParams) => TValidationRuleResult
export type TValidationRuleResult = boolean | string

export type TErrorsCollection = Record<string, TErrorMessagesCollection>
export type TErrorMessagesCollection = Array<TErrorMessage>
export type TErrorMessage = string


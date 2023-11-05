import { ref, Ref } from 'vue'

import {
  TFormCollection,
  TValidationRule,
  TErrorMessagesCollection,
  TErrorsCollection,
  TErrorMessage,
  getFormValues,
  required
} from './index'

interface IUseForm {
  getErrors: (field?: string) => TErrorMessagesCollection | TErrorsCollection
  getError: (field: string) => TErrorMessage | null
  formIsValid: (form: TFormCollection) => any
}

export const UseForm = (): IUseForm => {

  const errors: Ref<TErrorsCollection> = ref({})

  // ########################################################################################################################

  const getErrors = (field?: string): TErrorsCollection | TErrorMessagesCollection => {
    if (field) {
      return errors.value[field] || []
    }
    return errors.value
  }

  const getError = (field: string): TErrorMessage | null => {
    const errors: TErrorsCollection | TErrorMessagesCollection = getErrors(field)
    if (Array.isArray(errors)) {
      return errors[0] || null
    }
    return null
  }

  const formIsValid = (form: TFormCollection): boolean => {
    errors.value = {}
    const formValues = getFormValues(form)
    Object.entries(form).map(([name, { value , validationRules = []}]) => {
      const required = validationRules.find((validationRule: TValidationRule) => validationRule.name === 'required') !== undefined
      const validationRulesResults = validationRules.reduce((acc: Array<TErrorMessage>, validationRule: TValidationRule) => {
        const validationRuleResult = validationRule({ value, formValues, required })
        acc.push(...(validationRuleResult !== true ? [String(validationRuleResult)] : []))
        return acc
      }, [])
      if (validationRulesResults.length) {
        errors.value[name] = validationRulesResults
      }
    })
    return Object.keys(errors.value).length === 0
  }

  // ########################################################################################################################

  return {
    getErrors,
    getError,
    formIsValid,
  }

}

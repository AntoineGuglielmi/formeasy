import { ref, Ref } from 'vue'

import {
  TFormCollection,
  TValidationRule,
  TErrorMessagesCollection,
  TErrorsCollection,
  TErrorMessage,
  getFormValues,
  required,
  IForm,
  TResetValues
} from './index'

interface IUseForm {
  getErrors: (field?: string) => TErrorMessagesCollection | TErrorsCollection
  getError: (field: string) => TErrorMessage | null
  formIsValid: () => boolean
  reset: () => void
}

export const UseForm = (form: TFormCollection): IUseForm => {

  /**
   * @description Errors collection
   */
  const errors: Ref<TErrorsCollection> = ref({})

  /**
   * @description Reset values collection
   */
  const resetValues: Ref<TResetValues> = ref({})

  // ########################################################################################################################

  /**
   * @description Set reset values
   * @private
   * @param {TFormCollection} form
   */
  const _setResetValues = (form: TFormCollection): void => {
    Object.entries(form).map(([name, { value }]) => {
      resetValues.value[name] = value
    })
  }

  /**
   * @description Set reset values
   */
  _setResetValues(form)

  // ########################################################################################################################

  /**
   * @description Get errors. If field is provided, return errors for this field, otherwise return all errors
   * @param {string} field
   * @returns {TErrorsCollection | TErrorMessagesCollection}
   */
  const getErrors = (field?: string): TErrorsCollection | TErrorMessagesCollection => {
    if (field) {
      return errors.value[field] || []
    }
    return errors.value
  }

  /**
   * @description Get error. Return first error message for this field. If no error messages for this field or field does not exist, return null.
   * @param {string} field
   * @returns {TErrorMessage | null}
   */
  const getError = (field: string): TErrorMessage | null => {
    const errors: TErrorsCollection | TErrorMessagesCollection = getErrors(field)
    if (Array.isArray(errors)) {
      return errors[0] || null
    }
    return null
  }

  /**
   * @description Check if form is valid
   * @returns {boolean}
   */
  const formIsValid = (): boolean => {
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

  /**
   * @description Reset form values
   */
  const reset = (): void => {
    Object.entries(form).map(([name, field]: [name: string, field: IForm]) => {
      field.value = field.reset !== undefined ? field.reset : resetValues.value[name]
    })
  }

  // ########################################################################################################################

  return {
    getErrors,
    getError,
    formIsValid,
    reset
  }

}

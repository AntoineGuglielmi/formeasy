"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseForm = void 0;
const vue_1 = require("vue");
const index_1 = require("./index");
const UseForm = (form) => {
    /**
     * @description Errors collection
     */
    const errors = (0, vue_1.ref)({});
    /**
     * @description Reset values collection
     */
    const resetValues = (0, vue_1.ref)({});
    // ########################################################################################################################
    /**
     * @description Set reset values
     * @private
     * @param {TFormCollection} form
     */
    const _setResetValues = (form) => {
        Object.entries(form).map(([name, { value }]) => {
            resetValues.value[name] = value;
        });
    };
    /**
     * @description Set reset values
     */
    _setResetValues(form);
    // ########################################################################################################################
    /**
     * @description Get errors. If field is provided, return errors for this field, otherwise return all errors
     * @param {string} field
     * @returns {TErrorsCollection | TErrorMessagesCollection}
     */
    const getErrors = (field) => {
        if (field) {
            return errors.value[field] || [];
        }
        return errors.value;
    };
    /**
     * @description Get error. Return first error message for this field. If no error messages for this field or field does not exist, return null.
     * @param {string} field
     * @returns {TErrorMessage | null}
     */
    const getError = (field) => {
        const errors = getErrors(field);
        if (Array.isArray(errors)) {
            return errors[0] || null;
        }
        return null;
    };
    /**
     * @description Check if form is valid
     * @returns {boolean}
     */
    const formIsValid = () => {
        errors.value = {};
        const formValues = (0, index_1.getFormValues)(form);
        Object.entries(form).map(([name, { value, validationRules = [] }]) => {
            const required = validationRules.find((validationRule) => validationRule.name === 'required') !== undefined;
            const validationRulesResults = validationRules.reduce((acc, validationRule) => {
                const validationRuleResult = validationRule({ value, formValues, required });
                acc.push(...(validationRuleResult !== true ? [String(validationRuleResult)] : []));
                return acc;
            }, []);
            if (validationRulesResults.length) {
                errors.value[name] = validationRulesResults;
            }
        });
        return Object.keys(errors.value).length === 0;
    };
    /**
     * @description Reset form values
     */
    const reset = () => {
        Object.entries(form).map(([name, field]) => {
            field.value = field.reset !== undefined ? field.reset : resetValues.value[name];
        });
    };
    // ########################################################################################################################
    return {
        getErrors,
        getError,
        formIsValid,
        reset
    };
};
exports.UseForm = UseForm;

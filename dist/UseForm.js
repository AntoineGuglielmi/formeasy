"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseForm = void 0;
const vue_1 = require("vue");
const index_1 = require("./index");
const UseForm = () => {
    const errors = (0, vue_1.ref)({});
    // ########################################################################################################################
    const getErrors = (field) => {
        if (field) {
            return errors.value[field] || [];
        }
        return errors.value;
    };
    const getError = (field) => {
        const errors = getErrors(field);
        if (Array.isArray(errors)) {
            return errors[0] || null;
        }
        return null;
    };
    const formIsValid = (form) => {
        errors.value = {};
        const formValues = (0, index_1.getFormValues)(form);
        Object.entries(form).map(([name, { value, validationRules = [] }]) => {
            const isRequired = validationRules.find((validationRule) => validationRule.name === 'required') !== undefined;
            const validationRulesResults = validationRules.reduce((acc, validationRule) => {
                const validationRuleResult = validationRule({ value, formValues, isRequired });
                acc.push(...(validationRuleResult !== true ? [String(validationRuleResult)] : []));
                return acc;
            }, []);
            if (validationRulesResults.length) {
                errors.value[name] = validationRulesResults;
            }
        });
        return Object.keys(errors.value).length === 0;
    };
    // ########################################################################################################################
    return {
        getErrors,
        getError,
        formIsValid,
    };
};
exports.UseForm = UseForm;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pattern = exports.matches = exports.minLength = exports.onlyLetters = exports.required = void 0;
const index_1 = require("./index");
/**
 * required
 * @description Required validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
const required = (params = {}) => {
    const _params = Object.assign({ message: 'This field is required' }, params);
    const { special = null } = _params;
    return ({ value }) => {
        const isRequired = special !== null ? special : value;
        return !!isRequired || (0, index_1.getMessage)(_params);
    };
};
exports.required = required;
/**
 * onlyLetters
 * @description Only letters validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
const onlyLetters = (params = {}) => {
    const _params = Object.assign({ message: 'This field must contain only letters', required: true }, params);
    const { required } = _params;
    return ({ value }) => {
        const matches = required ? /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(value) : /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value);
        return matches || (0, index_1.getMessage)(_params);
    };
};
exports.onlyLetters = onlyLetters;
/**
 * minLength
 * @description Min length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
const minLength = (params = {}) => {
    const _params = Object.assign({ message: 'This field must contain at least {min} characters', min: 3 }, params);
    const { min } = _params;
    return ({ value }) => {
        return (value.length >= min) || (0, index_1.getMessage)(_params);
    };
};
exports.minLength = minLength;
/**
 * maxLength
 * @description Max length validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value, formValues}: {value: any, formValues?: any}) => boolean | string}
 */
const matches = (params = {}) => {
    const _params = Object.assign({ message: 'This field must match "{field}" field' }, params);
    const { field } = _params;
    return ({ value, formValues }) => {
        const matches = value === formValues[field];
        return matches || (0, index_1.getMessage)(_params);
    };
};
exports.matches = matches;
const pattern = (params = {}) => {
    const _params = Object.assign({ message: 'This field is not valid' }, params);
    const { pattern } = _params;
    return ({ value }) => {
        const matches = pattern.test(value);
        return matches || (0, index_1.getMessage)(_params);
    };
};
exports.pattern = pattern;

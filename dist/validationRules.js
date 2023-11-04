"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.pattern = exports.matches = exports.maxLength = exports.minLength = exports.onlyNumbers = exports.onlyLetters = exports.required = void 0;
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
    const required = ({ value }) => {
        const isRequired = special !== null ? special : value;
        return !!isRequired || (0, index_1.getMessage)(_params);
    };
    return required;
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
 * onlyNumbers
 * @description Only numbers validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
const onlyNumbers = (params = {}) => {
    const _params = Object.assign({ message: 'This field must contain only numbers', required: true }, params);
    const { required } = _params;
    return ({ value }) => {
        const matches = required ? /^[0-9]+$/.test(value) : /^[0-9]*$/.test(value);
        return matches || (0, index_1.getMessage)(_params);
    };
};
exports.onlyNumbers = onlyNumbers;
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
 * @returns {({value}: {value: any}) => boolean | string}
 */
const maxLength = (params = {}) => {
    const _params = Object.assign({ message: 'This field must contain at most {max} characters', max: 10 }, params);
    const { max } = _params;
    return ({ value }) => {
        return (value.length <= max) || (0, index_1.getMessage)(_params);
    };
};
exports.maxLength = maxLength;
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
/**
 * pattern
 * @description Pattern validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
const pattern = (params = {}) => {
    const _params = Object.assign({ message: 'This field is not valid' }, params);
    const { pattern } = _params;
    return ({ value }) => {
        const matches = pattern.test(value);
        return matches || (0, index_1.getMessage)(_params);
    };
};
exports.pattern = pattern;
/**
 * isEmail
 * @description Email validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => any}
 */
const isEmail = (params = {}) => {
    const _params = Object.assign({ message: 'This field must be a valid email' }, params);
    return (0, exports.pattern)(Object.assign({ pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g }, _params));
};
exports.isEmail = isEmail;

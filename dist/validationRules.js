"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFalse = exports.isTrue = exports.isEmail = exports.pattern = exports.matches = exports.maxLength = exports.minLength = exports.onlyNumbers = exports.onlyLetters = exports.required = void 0;
const index_1 = require("./index");
/**
 * required
 * @description Required validation rule. If otherValue is passed, it will be used instead of value
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => boolean | string}
 */
const required = (params = {}) => {
    params = Object.assign({ message: 'This field is required' }, params);
    const { otherValue = null } = params;
    return function required({ value }) {
        const target = otherValue !== null ? otherValue : value;
        return !!target || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must contain only letters' }, params);
    return ({ value, required }) => {
        const matches = required ? /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(value) : /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value);
        return matches || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must contain only numbers' }, params);
    return ({ value, required }) => {
        const matches = required ? /^[0-9]+$/.test(value) : /^[0-9]*$/.test(value);
        return matches || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must contain at least {min} characters', min: 3 }, params);
    const { min } = params;
    return ({ value }) => {
        return (value.length >= min) || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must contain at most {max} characters', max: 10 }, params);
    const { max } = params;
    return ({ value }) => {
        return (value.length <= max) || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must match "{field}" field' }, params);
    const { field } = params;
    return ({ value, formValues }) => {
        const matches = value === formValues[field];
        return matches || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field is not valid' }, params);
    const { pattern } = params;
    return ({ value }) => {
        const matches = pattern.test(value);
        return matches || (0, index_1.getMessage)(params);
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
    params = Object.assign({ message: 'This field must be a valid email' }, params);
    return ({ value }) => {
        return (0, exports.pattern)(Object.assign({ pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g }, params))({ value });
    };
};
exports.isEmail = isEmail;
/**
 * isTrue
 * @description True validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => TValidationRuleResult}
 */
const isTrue = (params = {}) => {
    params = Object.assign({ message: 'This field must be true' }, params);
    return ({ value }) => {
        return value === true || (0, index_1.getMessage)(params);
    };
};
exports.isTrue = isTrue;
/**
 * isFalse
 * @description False validation rule
 * @param {TValidationRuleWrapperParams} params
 * @returns {({value}: {value: any}) => TValidationRuleResult}
 */
const isFalse = (params = {}) => {
    params = Object.assign({ message: 'This field must be false' }, params);
    return ({ value }) => {
        return value === false || (0, index_1.getMessage)(params);
    };
};
exports.isFalse = isFalse;

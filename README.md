# formeasy

**formeasy** is a package that allows validating forms and displaying error messages in an easy way



## Summary
- [Installation](#installation)
- [Usage example in vue](#usage-example-in-vue)
- [Features](#features)
  - [`UseForm` composable](#useform-composable)
  - [Validation rules](#validation-rules)
  - [Helpers](#helpers)
  - [Types](#types)
- [Create a validation rule](#create-a-validation-rule)



## Installation

```bash
npm install formeasy
```



## Usage example in vue
```vue
<script lang="ts" setup>

import { UseForm, required } from 'formeasy'

const {
  formIsValid,
  getError,
} = UseForm()

const form = ref({
  firstname: {
    value: '',
    validationRules: [
      required(),
    ]
  },
  lastname: {
    value: '',
    validationRules: [
      required(),
    ]
  }
})

const submitForm = () => {

  if (formIsValid(form.value)) {
    // do something
  }

}

</script>

<template>
  <form
    @submit.prevent="submitForm"
  >

    <div>
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model="form.firstname.value">
      <p
        v-if="getError('firstname')"
      >{{ getError('firstname') }}</p>
    </div>

    <div>
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model="form.lastname.value">
      <p
        v-if="getError('lastname')"
      >{{ getError('lastname') }}</p>
    </div>

    <div>
      <button type="submit">Submit</button>
    </div>

  </form>
</template>
```



## Features
### `UseForm` composable
It's the main composable of the package. It allows to validate a form and get error messages.
```typescript
import { UseForm } from 'formeasy'

const {
  formIsValid,
  getError,
  getErrors
} = UseForm()
```
| Name          | Params                    | Description                                                                                                            |
|---------------|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| `formIsValid` | `(form: TFormCollection)` | Validate a form and returns `true` or `false` whether the form is valid or not                                         |                                                                                    |                                    |
| `getError`    | `(fieldName: string)`     | Returns the first error message for the field `fieldName` if it exists                                                 |
| `getErrors`   | `(fieldName?: string)`    | If `fieldName` is provided, returns all error messages fo the field `fieldName`, otherwise all messages for all fields |



### Validation rules
Validation rules are functions that return `true` if the field is valid, otherwise an error message. To date, the following validation 
rules are available:
```typescript
import {
  required,
  onlyLetters,
  minLength,
  matches,
  pattern
} from 'formeasy'
```
| Name          | Params                                    | Defaults  | Description                                                                   |
|---------------|-------------------------------------------|-----------|-------------------------------------------------------------------------------|
| `required`    | `({ message?: string })`                  |           | Returns an error message if the field is empty                                |
| `onlyLetters` | `({ message?: string })`                  |           | Returns an error message if the field contains other characters than letters  |
| `onlyNumbers` | `({ message?: string })`                  |           | Returns an error message if the field contains other characters than numbers  |
| `isEmail`     | `({ message?: string })`                  |           | Returns an error message if the field is not a valid email address            |
| `minLength`   | `({ min?: number, message?: string })`    | `min`: 3  | Returns an error message if the field length is less than `min`               |
| `maxLength`   | `({ max?: number, message?: string })`    | `max`: 10 | Returns an error message if the field length is more than `max`               |
| `matches`     | `({ field: string, message?: string })`   |           | Returns an error message if the field value is different from `field`'s value |
| `pattern`     | `({ pattern: RegExp, message?: string })` |           | Returns an error message if the field value doesn't match `pattern`           |

You can specify a custom error message by passing the `message` parameter to the validation rule function.

```typescript
required({message: 'This is a custom message'})
minLength({min: 5, message: 'You can also replace placeholders: {min}'}) // => You can also replace placeholders: 5
```



### Helpers
```typescript
import {
  getMessage,
  getFormValues
} from 'formeasy'
```
| Name            | Params                                   | Description                                                                                                                                                                                                                                         |
|-----------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getMessage`    | `(params: TValidationRuleWrapperParams)` | Returns the message with the placeholders replaced by the values of the `params` object. `params` must contain at least a `message` property.<br>Example: `getMessage({ message: 'One {two} three {four}, two: '2', four: '4' }) => 'One 2 three 4' |
| `getFormValues` | `(form: TFormCollection)`                | Returns the values of the form as an object. The keys are the field names and the values are the field values.                                                                                                                                      |




### Types
For information, here are the types used in this readme:
```typescript
type TFormCollection = Record<string, IForm>

interface IForm {
  value: string
  validationRules?: TValidationRulesCollection
}

type TValidationRulesCollection = Array<TValidationRule>

type TValidationRule = ({ value, formValues, required }: { value: any, formValues: any, required: boolean }) => boolean | string

type TValidationRuleWrapperParams = Record<string, any>
```



## Create a validation rule
You can create your own validation rules according to the following:
```typescript
const myCustomRule: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  // Merge defaults params with the params passed to the function
  params = {
    message: 'This is the default error message',
    someDefaultParam: 'foo',
    ...params
  }
  // Return the final function that tests the value.
  // The function takes an object as a parameter. See below for more details.
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    // The logic of the validation rule.
    // Returns true if the field is valid, otherwise an error message.
    // You can use the getMessage(param) helper to replace placeholders in the message
    return /*value is valid ?*/ || getMessage(params)
  }
}
```

The final function accepts an object as a parameter. This object contains the value to be tested, the values of the other fields of the 
form and a boolean indicating whether the field is required or not (`true` if the `required` validation rule is included in the 
validationRules array, otherwise `false`). Example below:  
```typescript
const isDoubleOf: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must be the double of "{field}" field',
    ...params
  }
  const {
    field
  } = params
  return ({ value, formValues, required }: IValidationRuleParams): TValidationRuleResult => {
    // If the field is required, return the double verification, otherwise return true
    const isEqualToDouble = Number(value) === Number(formValues[field]) * 2
    const shouldDisplayMessage = getMessage(params)

    return required
      ? (isEqualToDouble || shouldDisplayMessage)
      : (Number(value)
        ? (isEqualToDouble || shouldDisplayMessage)
        : true)
  }
}
```

You can also use other validation rules in your custom validation rule:
```typescript
const mustBeSolidPassword: TValidationRuleWrapper = (params: TValidationRuleWrapperParams = {}): TValidationRule => {
  params = {
    message: 'This field must be a solid password',
    ...params
  }
  return ({ value }: IValidationRuleParams): TValidationRuleResult => {
    // Use the pattern validation rule with a solid password regex.
    // Note that the return is the call of the result of the pattern validation rule.
    return pattern({
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      ...params
    })({ value })
  }
}
```

Finally, you can use your custom validation rules as seen previously:
```typescript
const form = ref({
  double: {
    value: '',
    validationRules: [
      isDoubleOf({ field: 'single' }),
    ]
  },
  password: {
    value: '',
    validationRules: [
      // You still can provide a custom params (and message)
      mustBeSolidPassword({ message: `The password you provided is not secure enough` })
    ]
  }
})
```

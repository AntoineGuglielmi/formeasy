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
Validation rules are functions that return `true` if the field is valid, otherwise an error message. To date, the following functions are 
available:
```typescript
import {
  required,
  onlyLetters,
  minLength,
  matches,
  pattern
} from 'formeasy'
```
| Name          | Params                                    | Defaults | Description                                                                   |
|---------------|-------------------------------------------|----------|-------------------------------------------------------------------------------|
| `required`    | `({ message?: string })`                  |          | Returns an error message if the field is empty                                |
| `onlyLetters` | `({ message?: string })`                  |          | Returns an error message if the field contains other characters than letters  |
| `minLength`   | `({ min?: number, message?: string })`    | `min`: 3 | Returns an error message if the field length is less than `min`               |
| `matches`     | `({ field: string, message?: string })`   |          | Returns an error message if the field value is different from `field`'s value |
| `pattern`     | `({ pattern: RegExp, message?: string })` |          | Returns an error message if the field value doesn't match `pattern`           |

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
| Name            | Params                          | Description                                                                                                                                                                                                                                         |
|-----------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getMessage`    | `(params: Record<string, any>)` | Returns the message with the placeholders replaced by the values of the `params` object. `params` must contain at least a `message` property.<br>Example: `getMessage({ message: 'One {two} three {four}, two: '2', four: '4' }) => 'One 2 three 4' |
| `getFormValues` | `(form: TFormCollection)`       | Returns the values of the form as an object. The keys are the field names and the values are the field values.                                                                                                                                      |




### Types
For information, here are the types used in this readme:
```typescript
type TFormCollection = Record<string, IForm>

interface IForm {
  value: string
  validationRules?: TValidationRulesCollection
}

type TValidationRulesCollection = Array<TValidationRule>

type TValidationRule = ({ value, formValues }: { value: any, formValues: any }) => boolean | string

type TValidationRuleWrapperParams = Record<string, any>
```



## Create a validation rule
You can create your own validation rules according to the following:
```typescript
const maxLength = (params: TValidationRuleWrapperParams = {}) => {
  // Merge defaults params with the params passed to the function
  const _params: TValidationRuleWrapperParams = {
    message: 'This field must contain at most {max} characters',
    max: 8,
    ...params
  }
  // Get the max value from the params
  const {
    max
  } = _params
  // Return the function that tests the value.
  // The function takes as parameters the value of the field 
  // and all the other values of the form
  return ({ value }: { value: any }) => {
    // Return true if the value length is less than or equal to max
    // otherwise return the error message with the placeholders replaced by the values
    return (value.length <= max) || getMessage(_params)
  }
}
```

You can access the other values of the form in the validation rule function. For example:
```typescript
const maxLength = (params: TValidationRuleWrapperParams = {}) => {
  // ...
  const {
    max,
    otherField
  } = _params
  return ({ value, formValues }: { value: any, formValues: any }) => {
    const otherFieldValue = formValues[otherField]
    // Return logic according to the value of otherField
  }
}
```

And finally use it as follows:
```typescript
const form = ref({
  firstname: {
    value: '',
    validationRules: [
      maxLength(),
      // or with custom params
      maxLength({ max: 10 }),
      // or
      maxLength({ max: 10, message: 'At most {max} characters!' }),
    ]
  }
})
```

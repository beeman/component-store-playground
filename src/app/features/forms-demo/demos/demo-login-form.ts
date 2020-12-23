import { UiFormField } from '../../../ui/form/ui-form-field'

export const demoLoginForm = {
  path: 'login',
  label: 'Login Form',
  fields: [
    UiFormField.email('email', { addonLeft: { icon: 'at' }, required: true }),
    UiFormField.password('password', { addonLeft: { icon: 'key' }, required: true }),
  ],
}

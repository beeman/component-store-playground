import { UiFormField } from '../../../ui/form/ui-form-field'

export const demoLoginForm = {
  path: 'login',
  label: 'Login Form',
  fields: [
    UiFormField.email('email', { addonLeft: { class: 'fa fa-fw fa-at' }, required: true }),
    UiFormField.password('password', { addonLeft: { class: 'fa fa-fw fa-key' }, required: true }),
  ],
}

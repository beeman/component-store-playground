import { FormField } from '@component-store-playground/shared/ui/forms'

export const demoLoginForm = {
  path: 'login',
  label: 'Login Form',
  fields: [
    FormField.email('email', { addonLeft: { icon: 'at' }, required: true }),
    FormField.password('password', { addonLeft: { icon: 'key' }, required: true }),
  ],
}

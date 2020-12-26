import { FormField } from '@component-store-playground/shared/ui/forms'
import { countryOptions } from './demo-sample-data'

function paymentDetailsFields(): FormField[] {
  const rowClass = 'grid grid-cols-4 sm:gap-6'
  const fieldClass = 'col-span-4 sm:col-span-2'
  const fieldClassSmall = 'col-span-4 sm:col-span-1'

  const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, rowClass)

  return [
    row([
      FormField.input('firstName', { label: 'First name', required: true }, { className: fieldClass }),
      FormField.input('lastName', { label: 'Last name', required: true }, { className: fieldClass }),
    ]),
    row([
      FormField.input('email', { type: 'email', label: 'Email', required: true }, { className: fieldClass }),
      FormField.input(
        'expirationDate',
        { label: 'Expiration Date', placeholder: 'MM / YY', required: true },
        { className: fieldClassSmall },
      ),
      FormField.input('securityCore', { label: 'Security Code', required: true }, { className: fieldClassSmall }),
    ]),
    row([
      FormField.select(
        'country',
        {
          label: 'Country / Region',
          required: true,
          options: [{ value: null, label: ' -- Select your country -- ', disabled: true }, ...countryOptions()],
        },
        { className: fieldClass },
      ),
      FormField.input('zip', { label: 'ZIP / Postal', required: true }, { className: fieldClass }),
    ]),
  ]
}

export const demoAdvancedLayout = {
  path: 'advanced-layout',
  label: 'Advanced layout',
  fields: [...paymentDetailsFields()],
}

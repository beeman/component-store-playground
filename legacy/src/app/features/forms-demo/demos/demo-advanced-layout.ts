import { UiFormField } from '../../../ui/form/ui-form-field'
import { countryOptions } from './demo-sample-data'

function paymentDetailsFields(): UiFormField[] {
  const rowClass = 'grid grid-cols-4 sm:gap-6'
  const fieldClass = 'col-span-4 sm:col-span-2'
  const fieldClassSmall = 'col-span-4 sm:col-span-1'

  const row = (fieldGroup: UiFormField[]) => UiFormField.fieldRow(fieldGroup, rowClass)

  return [
    row([
      UiFormField.input('firstName', { label: 'First name', required: true }, { className: fieldClass }),
      UiFormField.input('lastName', { label: 'Last name', required: true }, { className: fieldClass }),
    ]),
    row([
      UiFormField.input('email', { type: 'email', label: 'Email', required: true }, { className: fieldClass }),
      UiFormField.input(
        'expirationDate',
        { label: 'Expiration Date', placeholder: 'MM / YY', required: true },
        { className: fieldClassSmall },
      ),
      UiFormField.input('securityCore', { label: 'Security Code', required: true }, { className: fieldClassSmall }),
    ]),
    row([
      UiFormField.select(
        'country',
        {
          label: 'Country / Region',
          required: true,
          options: [{ value: null, label: ' -- Select your country -- ', disabled: true }, ...countryOptions()],
        },
        { className: fieldClass },
      ),
      UiFormField.input('zip', { label: 'ZIP / Postal', required: true }, { className: fieldClass }),
    ]),
  ]
}

export const demoAdvancedLayout = {
  path: 'advanced-layout',
  label: 'Advanced layout',
  fields: [...paymentDetailsFields()],
}

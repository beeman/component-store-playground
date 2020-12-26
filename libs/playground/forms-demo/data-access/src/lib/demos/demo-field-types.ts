import { FormField } from '@component-store-playground/shared/ui/forms'
import { countryOptions } from './demo-sample-data'

function fieldTypes(): FormField[] {
  const template = (title: string) => FormField.template(`<div class="text-lg font-semibold my-3">${title}</div>`)
  return [
    template('Inputs'),
    FormField.email('email', {
      label: 'Type: email',
      description: 'Renders <input type="email" />, has email validation by default',
    }),
    FormField.input('input', { label: 'Type: input', description: 'Renders standard <input type="text" />' }),

    FormField.number('number', { label: 'Type: number', description: 'Renders <input type="number" />' }),
    FormField.password('password', {
      label: 'Type: password',
      description: 'Renders <input type="password" />, has `min=8` and `required` enabled  ',
    }),
    FormField.textarea('textarea', { label: 'Type: textarea', description: 'Renders <textarea> field', rows: 5 }),

    template('Select boxes'),
    FormField.select('select', {
      label: 'Type: select',
      description: 'Renders single <select> with options.',
      options: countryOptions(),
    }),
    FormField.select('selectMulti', {
      label: 'Type: select',
      description: 'Renders multiple <select> with options.',
      options: countryOptions(),
      multiple: true,
    }),

    template('Checkboxes and Radio buttons'),
    FormField.checkbox('checkbox', { label: 'Type: checkbox', description: 'This is a styled checkbox' }),
    FormField.multicheckbox('multicheckbox', {
      label: 'Type: multicheckbox',
      description: 'Renders a row of checkboxes',
      options: countryOptions(),
    }),
    FormField.radio('radio', {
      label: 'Type: radio',
      description: 'Renders radio buttons',
      options: countryOptions(),
    }),

    template('Date and Time'),
    FormField.date('date', { label: 'Type: date', description: 'Renders the date picker from the browser' }),
    FormField.datetime('datetime', {
      label: 'Type: datetime',
      description: 'Renders the datetime picker from the browser',
    }),
    FormField.time('time', { label: 'Type: time', description: 'Renders the time picker from the browser' }),
  ]
}

export const demoFieldTypes = {
  path: 'field-types',
  label: 'Field types',
  fields: [...fieldTypes()],
}

import { UiFormField } from '../../../ui/form/ui-form-field'
import { countryOptions } from './demo-sample-data'

function fieldTypes(): UiFormField[] {
  const template = (title: string) => UiFormField.template(`<div class="text-lg font-semibold my-3">${title}</div>`)
  return [
    template('Inputs'),
    UiFormField.email('email', {
      label: 'Type: email',
      description: 'Renders <input type="email" />, has email validation by default',
    }),
    UiFormField.input('input', { label: 'Type: input', description: 'Renders standard <input type="text" />' }),

    UiFormField.number('number', { label: 'Type: number', description: 'Renders <input type="number" />' }),
    UiFormField.password('password', {
      label: 'Type: password',
      description: 'Renders <input type="password" />, has `min=8` and `required` enabled  ',
    }),
    UiFormField.textarea('textarea', { label: 'Type: textarea', description: 'Renders <textarea> field', rows: 5 }),

    template('Select boxes'),
    UiFormField.select('select', {
      label: 'Type: select',
      description: 'Renders single <select> with options.',
      options: countryOptions(),
    }),
    UiFormField.select('selectMulti', {
      label: 'Type: select',
      description: 'Renders multiple <select> with options.',
      options: countryOptions(),
      multiple: true,
    }),

    template('Checkboxes and Radio buttons'),
    UiFormField.checkbox('checkbox', { label: 'Type: checkbox', description: 'This is a styled checkbox' }),
    UiFormField.multicheckbox('multicheckbox', {
      label: 'Type: multicheckbox',
      description: 'Renders a row of checkboxes',
      options: countryOptions(),
    }),
    UiFormField.radio('radio', {
      label: 'Type: radio',
      description: 'Renders radio buttons',
      options: countryOptions(),
    }),

    template('Date and Time'),
    UiFormField.date('date', { label: 'Type: date', description: 'Renders the date picker from the browser' }),
    UiFormField.datetime('datetime', {
      label: 'Type: datetime',
      description: 'Renders the datetime picker from the browser',
    }),
    UiFormField.time('time', { label: 'Type: time', description: 'Renders the time picker from the browser' }),
  ]
}

export const demoFieldTypes = {
  path: 'field-types',
  label: 'Field types',
  fields: [...fieldTypes()],
}

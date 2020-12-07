import { FormlyField, FormlyTemplateOptions } from '@ngx-formly/core'
import { UiFormField } from '../../../ui/form/ui-form-field'

export const demoAddons = {
  path: 'addons',
  label: 'Addons',
  model: {
    showLoading: true,
  },
  fields: [
    UiFormField.email('email', {
      label: 'Basic addon',
      description: 'The fields can have addons to the left and right side of the input.',
      addonLeft: {
        class: 'fa fa-fw fa-at',
      },
      addonRight: {
        text: 'Work Email',
      },
    }),
    UiFormField.input(
      'dynamic',
      {
        label: 'Dynamic Addons',
        description: 'You can dynamically control the classes',
        addonLeft: {
          class: 'fa fa-fw fa-spinner animate-spin',
          onClick: (to: FormlyTemplateOptions) => alert('Clicked ' + to.label + ' addon'),
        },
      },
      {
        expressionProperties: {
          'templateOptions.addonLeft.class':
            'model.showLoading ? "fa fa-fw fa-spinner animate-spin text-yellow-500" : "fa fa-fw fa-check text-green-600" ',
        },
      },
    ),
    UiFormField.checkbox(
      'showLoading',
      {},
      {
        expressionProperties: {
          'templateOptions.label': 'model.showLoading ? "Stop loading": "Start Loading"',
        },
      },
    ),
    UiFormField.input(
      'value',
      {
        label: 'Addons with Click',
        description: 'The addons can have a click handler that gives access to the formControl',
        addonLeft: {
          // We want to start out with an empty class so the addon gets rendered
          class: ' ',
        },
        addonRight: {
          text: 'Toggle Currency',
          onClick: (to: FormlyTemplateOptions, f: FormlyField) =>
            (f.model.currency = f.model.currency === 'eur' ? 'usd' : 'eur'),
        },
      },
      {
        expressionProperties: {
          'templateOptions.addonLeft.class': 'model.currency === "eur" ? "fa fa-fw fa-euro" : "fa fa-fw fa-dollar" ',
        },
      },
    ),
  ],
}

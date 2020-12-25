import { FormField } from '@component-store-playground/playground/shared/ui/components/forms'
import { FormlyField, FormlyTemplateOptions } from '@ngx-formly/core'

export const demoAddons = {
  path: 'addons',
  label: 'Addons',
  model: {
    showLoading: true,
  },
  fields: [
    FormField.email('email', {
      label: 'Basic addon',
      description: 'The fields can have addons to the left and right side of the input by adding a `text` or `class`.',
      addonLeft: {
        class: 'h-4 w-4 bg-pink-400 rounded ',
      },
      addonRight: {
        text: 'Work Email',
      },
    }),
    FormField.input('github', {
      label: 'Addon with SVG Icon',
      description: 'The fields can use SVG icons to the left and right side of the input.',
      addonLeft: {
        icon: 'github',
      },
      addonRight: {
        icon: 'sun',
        iconClass: 'animate-spin',
      },
    }),
    FormField.input(
      'dynamic',
      {
        label: 'Dynamic Addons',
        description: 'You can dynamically control the classes',
        addonLeft: {
          icon: 'spinner',
          iconClass: 'animate-spin',
          onClick: (to: FormlyTemplateOptions) => alert('Clicked ' + to.label + ' addon'),
        },
      },
      {
        expressionProperties: {
          'templateOptions.addonLeft.icon': 'model.showLoading ? "spinner" : "check" ',
          'templateOptions.addonLeft.iconClass':
            'model.showLoading ? "animate-spin text-yellow-500" : "text-green-600" ',
        },
      },
    ),
    FormField.checkbox(
      'showLoading',
      {},
      {
        expressionProperties: {
          'templateOptions.label': 'model.showLoading ? "Stop loading": "Start Loading"',
        },
      },
    ),
    FormField.input(
      'value',
      {
        label: 'Addons with Click',
        description: 'The addons can have a click handler that gives access to the formControl',
        addonLeft: {
          // We want to start out with an empty class so the addon gets rendered
          icon: ' ',
        },
        addonRight: {
          text: 'Toggle Currency',
          onClick: (to: FormlyTemplateOptions, f: FormlyField) =>
            (f.model.currency = f.model.currency === 'eur' ? 'usd' : 'eur'),
        },
      },
      {
        expressionProperties: {
          'templateOptions.addonLeft.icon': 'model.currency === "eur" ? "euro" : "dollar" ',
        },
      },
    ),
  ],
}

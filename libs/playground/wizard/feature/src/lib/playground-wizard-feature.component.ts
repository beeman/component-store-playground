import { Component } from '@angular/core'
import { WizardStepper } from '@component-store-playground/playground/wizard/ui'
import { FormField } from '@component-store-playground/shared/ui/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  template: `
    <playground-page>
      <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden p-4">
        <playground-form (submitForm)="submit($event)" [fields]="fields"></playground-form>
      </div>
    </playground-page>
  `,
})
export class PlaygroundWizardFeatureComponent {
  fields: FormlyFieldConfig[] = [
    WizardStepper.stepper([
      WizardStepper.step('Personal data', [
        FormField.input('firstName', { label: 'First name', required: true }),
        FormField.number('age', { label: 'Age', required: true }),
      ]),
      WizardStepper.step('Destination', [
        FormField.input('country', {
          label: 'Country',
          required: true,
        }),
      ]),
      WizardStepper.step('Day of the trip', [FormField.date('day', { label: 'Day of the trip', required: true })]),
    ]),
  ]

  submit(model: any) {
    alert(JSON.stringify(model))
  }
}

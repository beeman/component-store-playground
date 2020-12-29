import { FormlyFieldConfig } from '@ngx-formly/core'

export class WizardStepper {
  static step(label: string, fields: FormlyFieldConfig[]): FormlyFieldConfig {
    return {
      templateOptions: { label },
      fieldGroup: fields,
    }
  }

  static stepper(steps: FormlyFieldConfig[]): FormlyFieldConfig {
    return {
      type: 'stepper',
      fieldGroup: steps,
    }
  }
}

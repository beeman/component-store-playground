import { CdkStepperModule } from '@angular/cdk/stepper'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormFieldModule } from '@component-store-playground/shared/ui/forms'
import { FormlyModule } from '@ngx-formly/core'

import { FormStepperComponent } from './form-stepper.component'
import { WizardStepperComponent } from './wizard-stepper.component'

@NgModule({
  declarations: [FormStepperComponent, WizardStepperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'stepper',
          component: FormStepperComponent,
        },
      ],
    }),
    CdkStepperModule,
  ],
})
export class FormStepperModule {}

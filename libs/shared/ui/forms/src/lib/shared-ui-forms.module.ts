import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormComponent } from './form.component'
import { FormCheckboxModule } from './types/checkbox/form-checkbox.module'
import { FormInputModule } from './types/input/form-input.module'
import { FormMulticheckboxModule } from './types/multicheckbox/form-multicheckbox.module'
import { FormRadioModule } from './types/radio/form-radio.module'
import { FormSelectModule } from './types/select/form-select.module'
import { FormTextareaModule } from './types/textarea/form-textarea.module'
import { FormValidationsModule } from './validations'
import { FormAddonsModule } from './wrappers/addons'
import { FormFieldModule } from './wrappers/form-field'

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent],
  imports: [
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    // Types
    FormCheckboxModule,
    FormInputModule,
    FormMulticheckboxModule,
    FormRadioModule,
    FormSelectModule,
    FormTextareaModule,
    // Validators
    FormValidationsModule,
    // Wrappers
    FormAddonsModule,
    FormFieldModule,
  ],
})
export class SharedUiFormsModule {}

import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormInputModule } from './types/ui-form-input.module'
import { UiFormComponent } from './ui-form.component'
import {
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  minValidationMessage,
} from './validators'

import { UiFormFieldModule } from './wrappers/form-field/ui-form-field.module'

@NgModule({
  imports: [
    ReactiveFormsModule,
    UiFormFieldModule,
    UiFormInputModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),
  ],
  declarations: [UiFormComponent],
  exports: [UiFormComponent],
})
export class UiFormModule {}

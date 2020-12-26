import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormFieldModule } from '../../wrappers/form-field'

import { FormCheckboxComponent } from './form-checkbox.component'

@NgModule({
  declarations: [FormCheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: FormCheckboxComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'boolean',
          extends: 'checkbox',
        },
      ],
    }),
  ],
})
export class FormCheckboxModule {}

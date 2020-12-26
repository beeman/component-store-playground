import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { FormFieldModule } from '../../wrappers/form-field'

import { FormRadioComponent } from './form-radio.component'

@NgModule({
  declarations: [FormRadioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'radio',
          component: FormRadioComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormRadioModule {}

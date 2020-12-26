import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { FormFieldModule } from '../../wrappers/form-field'

import { FormMulticheckboxComponent } from './form-multicheckbox.component'

@NgModule({
  declarations: [FormMulticheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'multicheckbox',
          component: FormMulticheckboxComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormMulticheckboxModule {}

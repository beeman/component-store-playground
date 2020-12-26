import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormFieldModule } from '../../wrappers/form-field'
import { FormInputComponent } from './form-input.component'

@NgModule({
  declarations: [FormInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormInputComponent,
          wrappers: ['form-field'],
        },
        { name: 'string', extends: 'input' },
        {
          name: 'password',
          extends: 'input',
          defaultOptions: {
            templateOptions: { type: 'password' },
          },
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
      ],
    }),
  ],
})
export class FormInputModule {}

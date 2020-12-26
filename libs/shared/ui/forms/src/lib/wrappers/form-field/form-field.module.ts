import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormFieldComponent } from './form-field.component'

@NgModule({
  declarations: [FormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'form-field',
          component: FormFieldComponent,
        },
      ],
    }),
  ],
})
export class FormFieldModule {}

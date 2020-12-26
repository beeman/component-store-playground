import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { FormlyModule } from '@ngx-formly/core'
import { FormAddonsComponent } from './form-addons.component'
import { addonsExtension } from './form-addons.extension'

@NgModule({
  declarations: [FormAddonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [{ name: 'addons', component: FormAddonsComponent }],
      extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
    }),
    SharedUiIconModule,
  ],
})
export class FormAddonsModule {}

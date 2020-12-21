import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiIconModule } from '../../../icon/ui-icon.module'

import { UiFormAddonsComponent } from './ui-form-addons.component'
import { addonsExtension } from './ui-form-addons.extension'

@NgModule({
  declarations: [UiFormAddonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [{ name: 'addons', component: UiFormAddonsComponent }],
      extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
    }),
    UiIconModule,
  ],
})
export class UiFormAddonsModule {}

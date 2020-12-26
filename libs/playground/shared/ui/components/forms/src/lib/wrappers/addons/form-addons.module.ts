import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
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
    PlaygroundSharedUiComponentsIconModule,
  ],
})
export class FormAddonsModule {}

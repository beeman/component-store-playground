import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormTextareaComponent extends FieldType {
  formControl!: FormControl
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  }
}

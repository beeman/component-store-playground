import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <input
      class="shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md block w-full sm:text-sm"
      [ngClass]="classNames"
      [type]="type"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    />
  `,
})
export class UiFormInputComponent extends FieldType {
  formControl!: FormControl

  get type(): string {
    return this.to.type || 'text'
  }

  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }
}

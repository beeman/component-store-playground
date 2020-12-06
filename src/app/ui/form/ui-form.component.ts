import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'

@Component({
  selector: 'app-form',
  template: ` <formly-form [form]="form" [fields]="field" [model]="model" [options]="options"></formly-form> `,
})
export class UiFormComponent {
  @Input() form = new FormGroup({})
  @Input() field: FormlyFieldConfig[] = []
  @Input() model: any = {}
  @Input() options: FormlyFormOptions = {}
}

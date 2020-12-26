import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core'

@Component({
  selector: 'playground-form',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="submit()">
      <formly-form [form]="form" [fields]="fields" [model]="model" [options]="options"></formly-form>
    </form>
  `,
})
export class FormComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({})
  @Input() fields: FormlyFieldConfig[] = []
  @Input() model?: any = {}
  @Input() options: FormlyFormOptions = {}
  @Output() submitForm = new EventEmitter()

  constructor(private builder: FormlyFormBuilder) {}

  ngOnInit(): void {
    this.builder.buildForm(this.form, this.fields, this.model, this.options)
  }

  submit(): void {
    this.submitForm.emit({ ...this.model })
  }
}

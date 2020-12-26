import { FormlyFieldConfig } from '@ngx-formly/core'

export function minlengthValidationMessage(_: unknown, field: FormlyFieldConfig): string {
  return `Should have at least ${field.templateOptions?.minLength} characters`
}

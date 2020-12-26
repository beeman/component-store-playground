import { FormlyFieldConfig } from '@ngx-formly/core'

export function maxlengthValidationMessage(_: unknown, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`
}

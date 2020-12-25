import { FormlyFieldConfig } from '@ngx-formly/core'

export function minValidationMessage(_: unknown, field: FormlyFieldConfig): string {
  return `This value should be more than ${field.templateOptions?.min}`
}

import { FormlyFieldConfig } from '@ngx-formly/core'

export function emailValidatorMessage(_: unknown, field: FormlyFieldConfig): string {
  return `"${field.formControl?.value}" is not a valid email address`
}

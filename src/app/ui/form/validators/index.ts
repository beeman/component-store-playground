export function minlengthValidationMessage(err: any, field: any): string {
  return `Should have at least ${field.templateOptions.minLength} characters`
}

export function maxlengthValidationMessage(err: any, field: any): string {
  return `This value should be less than ${field.templateOptions.maxLength} characters`
}

export function minValidationMessage(err: any, field: any): string {
  return `This value should be more than ${field.templateOptions.min}`
}

export function maxValidationMessage(err: any, field: any): string {
  return `This value should be less than ${field.templateOptions.max}`
}

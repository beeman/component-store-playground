import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export function emailValidator(control: AbstractControl): ValidationErrors {
  return Validators.email(control) as ValidationErrors
}

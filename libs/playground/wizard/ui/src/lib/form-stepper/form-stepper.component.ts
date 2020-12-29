import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  template: `
    <wizard-stepper>
      <cdk-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
        <ng-template cdkStepLabel>{{ step.templateOptions?.label }}</ng-template>

        <formly-field [field]="step"></formly-field>

        <div class="flex justify-between">
          <div>
            <button cdkStepperPrevious *ngIf="index !== 0" class="btn btn-primary" type="button">Back</button>
          </div>

          <div>
            <button cdkStepperNext *ngIf="!last" class="btn btn-primary" type="button" [disabled]="!isValid(step)">
              Next
            </button>
            <button *ngIf="last" class="btn btn-primary " [disabled]="!form.valid" type="submit">Submit</button>
          </div>
        </div>
      </cdk-step>
    </wizard-stepper>
  `,
})
export class FormStepperComponent extends FieldType {
  formControl!: FormControl

  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl!.valid
    }

    return field.fieldGroup!.every((f) => this.isValid(f))
  }
}

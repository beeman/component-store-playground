import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  template: `
    <app-page>
      <div
        class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden py-4 px-6"
      >
        <div class="sm:flex sm:items-center">
          <div class="flex-grow">
            <ui-stepper [selectedIndex]="1">
              <cdk-step label="Create Account" [completed]="true">
                <p>Create Account</p>
              </cdk-step>
              <cdk-step label="Profile Information">
                <p>Profile Information</p>
              </cdk-step>
              <cdk-step label="Theme">
                <p>Theme</p>
              </cdk-step>
            </ui-stepper>
          </div>
        </div>
      </div>
    </app-page>
  `,
})
export class WizardComponent {
  model = {}
  form = new FormGroup({})
  fields: FormlyFieldConfig[] = []

  submit(value: any): void {
    console.log(value)
  }
}

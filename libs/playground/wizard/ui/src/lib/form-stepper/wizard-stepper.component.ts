import { CdkStepper } from '@angular/cdk/stepper'
import { Component } from '@angular/core'

@Component({
  selector: 'wizard-stepper',
  template: `
    <section class="flex flex-col space-y-4">
      <header class="bg-gray-900 p-4 rounded-md flex space-x-3">
        <ng-container *ngFor="let step of steps; let i = index; let last = last">
          <div
            class="flex items-center space-x-2"
            [ngClass]="{ 'text-indigo-500': step.completed, 'text-gray-500': selectedIndex !== i }"
          >
            <div
              class="h-6 w-6 text-gray-500 border border-gray-600 flex items-center justify-center rounded-full"
              [ngClass]="{
                'text-indigo-500 border-indigo-500': selectedIndex === i,
                'bg-indigo-700 text-indigo-200 border-indigo-500': step?.completed
              }"
            >
              {{ i + 1 }}
            </div>
            <div [ngTemplateOutlet]="step.stepLabel.template"></div>
          </div>
        </ng-container>
      </header>

      <div [ngTemplateOutlet]="selected ? selected.content : null"></div>
    </section>
  `,
  providers: [{ provide: CdkStepper, useExisting: WizardStepperComponent }],
})
export class WizardStepperComponent extends CdkStepper {}

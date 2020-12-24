import { CdkStepper } from '@angular/cdk/stepper'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-stepper',
  template: `
    <section class="example-container">
      <header>
        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav aria-label="Progress">
          <ol class="border border-gray-300 bg-gray-700 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
            <li class="relative md:flex-1 md:flex">
              <!-- Completed Step -->
              <a class="group flex items-center w-full">
                <span class="px-6 py-4 flex items-center text-sm font-medium">
                  <span
                    class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
                  >
                    <!-- Heroicon name: check -->
                    <svg
                      class="w-6 h-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span class="ml-4 text-sm font-medium text-gray-900">Job details</span>
                </span>
              </a>

              <div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 -2L20 40L0 82"
                    vector-effect="non-scaling-stroke"
                    stroke="currentcolor"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </li>

            <li class="relative md:flex-1 md:flex">
              <!-- Current Step -->
              <a class="px-6 py-4 flex items-center text-sm font-medium">
                <span
                  class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full"
                  aria-current="step"
                >
                  <span class="text-indigo-600">02</span>
                </span>
                <span class="ml-4 text-sm font-medium text-indigo-600">Application form</span>
              </a>

              <div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 -2L20 40L0 82"
                    vector-effect="non-scaling-stroke"
                    stroke="currentcolor"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </li>

            <li class="relative md:flex-1 md:flex">
              <!-- Upcoming Step -->
              <a class="group flex items-center">
                <span class="px-6 py-4 flex items-center text-sm font-medium">
                  <span
                    class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span class="text-gray-500 group-hover:text-gray-900">03</span>
                  </span>
                  <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">Preview</span>
                </span>
              </a>
            </li>
          </ol>
        </nav>

        <!--        <h2>Step {{ selectedIndex + 1 }}/{{ steps.length }}</h2>-->

        <ng-container *ngFor="let step of steps; let i = index">
          {{ step.label }}
        </ng-container>
      </header>

      <div [ngTemplateOutlet]="selected ? selected.content : null"></div>

      <footer class="example-step-navigation-bar">
        <nav class="flex items-center justify-center" aria-label="Progress">
          <ol class="ml-8 flex items-center space-x-5">
            <li>
              <button class="example-nav-button" cdkStepperPrevious>&larr;</button>
            </li>

            <ng-container *ngFor="let step of steps; let i = index">
              <li>
                <ng-container *ngIf="i === selectedIndex">
                  <button class="relative flex items-center justify-center" aria-current="step">
                    <span class="absolute w-5 h-5 p-px flex" aria-hidden="true">
                      <span class="w-full h-full rounded-full bg-indigo-200"></span>
                    </span>
                    <span class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full" aria-hidden="true"></span>
                    <span class="sr-only">Step 2</span>
                  </button>
                </ng-container>
                <ng-container *ngIf="i !== selectedIndex">
                  <button
                    class="block w-2.5 h-2.5 rounded-full"
                    [ngClass]="{
                      'bg-gray-200  hover:bg-gray-400': i !== selectedIndex && !step.completed,
                      'bg-indigo-600 hover:bg-indigo-900': step.completed
                    }"
                  >
                    <span class="sr-only">Step {{ i + 1 }}</span>
                  </button>
                </ng-container>
              </li>
            </ng-container>
            <!--            <li>-->
            <!--              &lt;!&ndash; Completed Step &ndash;&gt;-->
            <!--              <a  class="">-->
            <!--                <span class="sr-only">Step 1</span>-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              &lt;!&ndash; Completed Step &ndash;&gt;-->
            <!--              <a  class="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900">-->
            <!--                <span class="sr-only">Step 1</span>-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              &lt;!&ndash; Current Step &ndash;&gt;-->
            <!--              <a  class="relative flex items-center justify-center" aria-current="step">-->
            <!--                <span class="absolute w-5 h-5 p-px flex" aria-hidden="true">-->
            <!--                  <span class="w-full h-full rounded-full bg-indigo-200"></span>-->
            <!--                </span>-->
            <!--                <span class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full" aria-hidden="true"></span>-->
            <!--                <span class="sr-only">Step 2</span>-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              <a  class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">-->
            <!--                <span class="sr-only">Step 3</span>-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              <a  class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">-->
            <!--                <span class="sr-only">Step 4</span>-->
            <!--              </a>-->
            <!--            </li>-->
            <li>
              <button class="example-nav-button" cdkStepperNext>&rarr;</button>
            </li>
          </ol>
        </nav>

        <!--        <button-->
        <!--          class="example-step"-->
        <!--          [class.example-active]="selectedIndex === i"-->
        <!--          -->
        <!--          (click)="selectStepByIndex(i)"-->
        <!--        >-->
        <!--          Step {{ i + 1 }}-->
        <!--        </button>-->
      </footer>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper, useExisting: UiStepperComponent }],
})
export class UiStepperComponent extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index
  }
}

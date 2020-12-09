import { Component } from '@angular/core'
import { FormsDemoDetailStore } from './forms-demo-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div
        class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden py-4 px-6"
      >
        <div class="sm:flex sm:items-center">
          <div class="flex-grow">
            <h3 class="font-semibold px-2 py-3 leading-tight">{{ vm?.demo?.label }}</h3>
            <div class="w-full mt-6" *ngIf="vm.form && vm.model && vm.demo?.fields?.length">
              <ui-form [form]="vm.form" [fields]="vm.demo?.fields || []" [model]="vm.model"></ui-form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden py-4 px-6 mt-6 md:mt-12"
      >
        <div class="font-semibold">Model:</div>
        <pre>{{ vm.model | json }} </pre>
      </div>
    </ng-container>
  `,
  providers: [FormsDemoDetailStore],
})
export class FormsDemoDetailComponent {
  vm$ = this.formsDemoStore.vm$
  constructor(private readonly formsDemoStore: FormsDemoDetailStore) {}
}

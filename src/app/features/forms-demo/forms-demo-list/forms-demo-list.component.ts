import { Component, OnInit } from '@angular/core'
import { FormsDemoListStore } from './forms-demo-list.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <app-page>
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside class="py-3 sm:py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav class="space-y-2 text-gray-900 dark:text-gray-300">
              <ng-container *ngFor="let demo of vm.demos">
                <a
                  [routerLink]="demo.path"
                  routerLinkActive="bg-purple-500 text-white dark:bg-purple-800"
                  class="bg-purple-100 dark:bg-purple-600 hover:text-gray-900 dark:hover:text-gray-100 focus:bg-purple-500 dark:focus:bg-purple-700 focus:text-white hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                >
                  <span class="truncate">
                    {{ demo.label }}
                  </span>
                </a>
              </ng-container>
            </nav>
          </aside>
          <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <router-outlet></router-outlet>
          </div>
        </div>
      </app-page>
    </ng-container>
  `,
  providers: [FormsDemoListStore],
})
export class FormsDemoListComponent implements OnInit {
  vm$ = this.formsDemoStore.vm$
  constructor(private readonly formsDemoStore: FormsDemoListStore) {}

  ngOnInit(): void {
    this.formsDemoStore.loadDemosEffect()
  }
}

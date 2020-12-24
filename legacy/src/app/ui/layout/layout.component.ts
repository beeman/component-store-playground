import { Component } from '@angular/core'

@Component({
  template: `
    <div class="h-full flex flex-col justify-between bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
      <app-header></app-header>
      <div class="flex-grow overflow-auto">
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </div>
    </div>
  `,
})
export class LayoutComponent {}

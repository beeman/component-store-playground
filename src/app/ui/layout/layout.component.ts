import { Component } from '@angular/core'

@Component({
  template: `
    <div class="h-full flex flex-col justify-between bg-gray-100">
      <app-header></app-header>
      <div class="container flex-grow mx-auto ">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
})
export class LayoutComponent {}

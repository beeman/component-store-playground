import { Component } from '@angular/core'

@Component({
  template: `
    <app-header></app-header>
    <div class="container mx-auto ">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent {}

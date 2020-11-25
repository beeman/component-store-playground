import { Component } from '@angular/core'

@Component({
  selector: 'app-page',
  template: `
    <div class="bg-gray-100">
      <div class="flex items-start lg:items-center justify-center">
        <div class="container mx-auto px-4 h-full md:flex">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class PageComponent {}

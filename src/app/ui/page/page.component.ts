import { Component } from '@angular/core'

@Component({
  selector: 'app-page',
  template: `
    <div class="container mx-auto h-full md:flex">
      <ng-content></ng-content>
    </div>
  `,
})
export class PageComponent {}

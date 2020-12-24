import { Component } from '@angular/core'

@Component({
  selector: 'app-page',
  template: `
    <div class="container mx-auto md:py-6">
      <ng-content></ng-content>
    </div>
  `,
})
export class PageComponent {}

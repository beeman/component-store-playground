import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'playground-page',
  templateUrl: './page.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}

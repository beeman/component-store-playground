import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'playground-loading',
  templateUrl: './loading.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @Input() loading = false
}

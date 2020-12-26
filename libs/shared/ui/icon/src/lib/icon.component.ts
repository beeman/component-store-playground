import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UiIcon } from './enums'

@Component({
  selector: 'playground-icon',
  templateUrl: './icon.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() icon!: UiIcon | string
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md'
}

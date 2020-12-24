import { Component, Input } from '@angular/core'
import { UiIcon } from './ui-icon-sets'

@Component({
  selector: 'ui-icon',
  template: `
    <div class="flex items-center">
      <svg-icon [key]="icon" [size]="size"></svg-icon>
    </div>
  `,
})
export class UiIconComponent {
  @Input() icon!: UiIcon | string
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md'
}

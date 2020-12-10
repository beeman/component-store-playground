import { Component, HostBinding, Input } from '@angular/core'
import { UiIcon } from './ui-icon-sets'

@Component({
  selector: 'ui-icon',
  template: ` <svg-icon [name]="icon"></svg-icon> `,
})
export class UiIconComponent {
  @Input() icon!: UiIcon | string
  @Input() size: 'sm' | 'md' | 'lg' = 'md'

  get sizeMap(): number {
    switch (this.size) {
      case 'md':
        return 6
      case 'sm':
        return 4
      case 'lg':
        return 8
    }
  }

  @HostBinding('class') get class(): string {
    const size = this.sizeMap
    return ['self-center', 'inline-block', `h-${size}`, `w-${size}`].join(' ')
  }
}

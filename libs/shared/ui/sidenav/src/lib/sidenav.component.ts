import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import type { NavItem } from '@component-store-playground/shared/data-access/models'

@Component({
  selector: 'playground-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() navItems: NavItem[] = []
}

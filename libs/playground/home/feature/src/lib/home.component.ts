import { ChangeDetectionStrategy, Component } from '@angular/core'
import { UiStore } from '@component-store-playground/shared/data-access/ui-store'

@Component({
  selector: 'playground-home',
  templateUrl: './home.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly navItems$ = this.uiStore.navItems$
  constructor(private readonly uiStore: UiStore) {}
}

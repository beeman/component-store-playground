import { ChangeDetectionStrategy, Component } from '@angular/core'
import { UiStore } from '@component-store-playground/playground/shared/ui/data-access'

@Component({
  selector: 'playground-header',
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  links: { label: string; path: string }[] = [
    { label: 'Forms', path: 'forms' },
    { label: 'Todos', path: 'todos' },
    { label: 'Workflows', path: 'workflows' },
  ]
  vm$ = this.service.vm$

  constructor(private readonly service: UiStore) {}

  toggleDarkMode(): void {
    this.service.toggleTheme()
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'

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
  links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Forms', path: '/forms' },
    { label: 'Todos', path: '/todos' },
    { label: 'Workflows', path: '/workflows' },
  ]
}

import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-purple-900 text-purple-300">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-purple-300 mb-4 md:mb-0" routerLink="/">
          <span class="text-xl">Component Store Playground</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-2">
          <ng-container *ngFor="let link of links">
            <a
              class="hover:bg-purple-400 hover:text-purple-900 rounded bg-purple-800 px-2 py-1"
              routerLinkActive="bg-blue-400"
              [routerLink]="link.path"
            >
              {{ link.label }}
            </a>
          </ng-container>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  links: { label: string; path: string }[] = [
    { label: 'Forms', path: 'forms' },
    { label: 'Todos', path: 'todos' },
    { label: 'Workflows', path: 'workflows' },
  ]
}

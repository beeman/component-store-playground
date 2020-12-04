import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <header class="text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" routerLink="/">
          <span class="text-xl">Component Store Playground</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-2">
          <ng-container *ngFor="let link of links">
            <a class="hover:text-gray-900 px-2 py-1" routerLinkActive=" bg-gray-200 rounded " [routerLink]="link.path">
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
    { label: 'Todos', path: 'todos' },
    { label: 'Workflows', path: 'workflows' },
  ]
}

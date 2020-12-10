import { Component } from '@angular/core'
import { UiStateService } from '../ui-state.service'

@Component({
  selector: 'app-header',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
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

            <button (click)="toggleDarkMode()">
              <ui-icon [icon]="vm.icon"></ui-icon>
            </button>

            <a class="px-2 py-1" href="https://github.com/beeman/component-store-playground" target="_blank">
              <i class="fa fa-github"></i>
            </a>
          </nav>
        </div>
      </header>
    </ng-container>
  `,
})
export class HeaderComponent {
  links: { label: string; path: string }[] = [
    { label: 'Forms', path: 'forms' },
    { label: 'Todos', path: 'todos' },
    { label: 'Workflows', path: 'workflows' },
  ]
  vm$ = this.service.vm$

  constructor(private readonly service: UiStateService) {}

  toggleDarkMode(): void {
    this.service.toggleTheme()
  }
}

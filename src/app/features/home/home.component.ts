import { Component } from '@angular/core'

@Component({
  template: `
    <app-page>
      <div class="max-w-lg mx-auto grid gap-5 md:grid-cols-3 md:max-w-none">
        <ng-container *ngFor="let link of links">
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-1 bg-white p-6 flex flex-col text-center">
              <a [routerLink]="link.path" class="block h-32 flex items-center justify-center">
                <p class="text-xl font-semibold text-gray-900">{{ link.label }}</p>
              </a>
            </div>
          </div>
        </ng-container>
      </div>
    </app-page>
  `,
})
export class HomeComponent {
  links = [
    { label: 'Forms', path: '/forms' },
    { label: 'Todos', path: '/todos' },
    { label: 'Workflows', path: '/workflows' },
  ]
}

import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `
    <div class="mt-12 max-w-lg mx-auto grid gap-5 md:grid-cols-2 md:max-w-none">
      <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-1 bg-white p-6 flex flex-col text-center">
          <a routerLink="/todos" class="block h-32 flex items-center justify-center">
            <p class="text-xl font-semibold text-gray-900">Todos</p>
          </a>
        </div>
      </div>

      <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-1 bg-white p-6 flex flex-col text-center">
          <a routerLink="/workflows" class="block h-32 flex items-center justify-center">
            <p class="text-xl font-semibold text-gray-900">Workflows</p>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}

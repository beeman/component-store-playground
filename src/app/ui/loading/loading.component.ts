import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loading',
  template: `
    <div class="flex items-center justify-center p-16 bg-gray-100 min-w-screen rounded" *ngIf="loading">
      <div class="flex space-x-2 animate-pulse">
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  `,
})
export class LoadingComponent {
  @Input() loading = false
}

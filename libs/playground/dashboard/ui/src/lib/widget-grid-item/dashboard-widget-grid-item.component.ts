import { Component, Input } from '@angular/core'
import { Widget, WidgetType } from '@component-store-playground/playground/dashboard/data-access'

@Component({
  selector: 'dashboard-widget-grid-item',
  template: `
    <div class="flex-1 bg-white dark:bg-gray-800 flex flex-col text-center  ">
      <div class="bg-gray-200 dark:bg-gray-700 py-2">
        <p class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ widget.title }}</p>
      </div>

      <div class="p-6">
        <ng-container [ngSwitch]="widget?.type">
          <ng-container *ngSwitchCase="types.html">
            <div [innerHTML]="widget.content"></div>
          </ng-container>
          <ng-container *ngSwitchCase="types.uptime">
            <pre>Uptime: {{ widget.data$ | async }}</pre>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
})
export class DashboardWidgetGridItemComponent {
  @Input() widget!: Widget
  @Input() types = WidgetType
}

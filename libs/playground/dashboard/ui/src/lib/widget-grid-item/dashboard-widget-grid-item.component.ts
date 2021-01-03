import { Component, Input } from '@angular/core'
import { Widget, WidgetType } from '@component-store-playground/playground/dashboard/data-access'

@Component({
  selector: 'dashboard-widget-grid-item',
  template: `
    <div
      class="bg-white dark:bg-gray-800 flex flex-col text-center h-full  rounded-lg shadow-md overflow-hidden border-2 dark:border-gray-800 overflow-hidden"
    >
      <div class="bg-gray-200 dark:bg-gray-700 py-2">
        <p class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ widget.title }}</p>
      </div>

      <div class="h-full">
        <ng-container [ngSwitch]="widget?.type">
          <ng-container *ngSwitchCase="types.chart">
            <dashboard-type-chart [widget]="widget"></dashboard-type-chart>
          </ng-container>
          <ng-container *ngSwitchCase="types.html">
            <dashboard-type-html [widget]="widget"></dashboard-type-html>
          </ng-container>
          <ng-container *ngSwitchCase="types.uptime">
            <dashboard-type-uptime [widget]="widget"></dashboard-type-uptime>
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

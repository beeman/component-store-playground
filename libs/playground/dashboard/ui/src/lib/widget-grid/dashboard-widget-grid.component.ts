import { Component, Input } from '@angular/core'
import { Widget } from '@component-store-playground/playground/dashboard/data-access'

@Component({
  selector: 'dashboard-widget-grid',
  template: `
    <div class="max-w-lg mx-auto grid gap-5 md:grid-cols-3 md:max-w-none mt-6 md:mt-0">
      <div *ngFor="let widget of widgets" class="">
        <dashboard-widget-grid-item [widget]="widget"></dashboard-widget-grid-item>
      </div>
    </div>
  `,
})
export class DashboardWidgetGridComponent {
  @Input() widgets: Widget[] = []
}

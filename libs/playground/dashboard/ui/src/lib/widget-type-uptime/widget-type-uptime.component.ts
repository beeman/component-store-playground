import { Component, Input } from '@angular/core'
import { Widget } from '@component-store-playground/playground/dashboard/data-access'

@Component({
  selector: 'dashboard-type-uptime',
  template: `
    <div class="flex justify-center items-center h-full">
      <pre>{{ widget.content }}: {{ widget.data$ | async }}</pre>
    </div>
  `,
})
export class WidgetTypeUptimeComponent {
  @Input() widget!: Widget
}

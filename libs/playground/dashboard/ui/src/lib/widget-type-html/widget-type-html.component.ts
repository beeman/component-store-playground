import { Component, Input } from '@angular/core'
import { Widget } from '@component-store-playground/playground/dashboard/data-access'

@Component({
  selector: 'dashboard-type-html',
  template: `
    <div class="flex justify-center items-center h-full">
      <div [innerHTML]="widget.content"></div>
    </div>
  `,
})
export class WidgetTypeHtmlComponent {
  @Input() widget!: Widget
}

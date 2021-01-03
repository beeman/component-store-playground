import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { WidgetTypeChartModule } from '../widget-type-chart/widget-type-chart.module'
import { WidgetTypeHtmlModule } from '../widget-type-html/widget-type-html.module'
import { WidgetTypeUptimeModule } from '../widget-type-uptime/widget-type-uptime.module'
import { DashboardWidgetGridItemComponent } from './dashboard-widget-grid-item.component'

@NgModule({
  declarations: [DashboardWidgetGridItemComponent],
  imports: [CommonModule, WidgetTypeHtmlModule, WidgetTypeUptimeModule, WidgetTypeChartModule],
  exports: [DashboardWidgetGridItemComponent],
})
export class DashboardWidgetGridItemModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DashboardWidgetGridItemModule } from '../widget-grid-item/dashboard-widget-grid-item.module'
import { DashboardWidgetGridComponent } from './dashboard-widget-grid.component'

@NgModule({
  declarations: [DashboardWidgetGridComponent],
  imports: [CommonModule, DashboardWidgetGridItemModule],
  exports: [DashboardWidgetGridComponent],
})
export class DashboardWidgetGridModule {}

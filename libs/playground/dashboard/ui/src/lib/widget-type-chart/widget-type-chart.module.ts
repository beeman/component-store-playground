import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { WidgetTypeChartComponent } from './widget-type-chart.component'
import { HighchartsChartModule } from 'highcharts-angular'

@NgModule({
  declarations: [WidgetTypeChartComponent],
  imports: [CommonModule, HighchartsChartModule],
  exports: [WidgetTypeChartComponent],
})
export class WidgetTypeChartModule {}

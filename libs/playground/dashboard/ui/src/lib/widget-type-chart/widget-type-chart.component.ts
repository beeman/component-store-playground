import { Component, Input } from '@angular/core'
import { Widget } from '@component-store-playground/playground/dashboard/data-access'
import * as Highcharts from 'highcharts'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
// @ts-ignore
const colors = require('tailwindcss/colors')

function getHighCharts() {
  const hc = Highcharts
  hc.theme = {
    colors: [colors.green['500'], colors.blue['500'], colors.yellow['500'], colors.red['500']],
    chart: {
      backgroundColor: colors.blueGray['900'],
    },
    xAxis: {
      gridLineColor: colors.blueGray['700'],
      lineColor: colors.blueGray['600'],
    },
    colorAxis: {
      className: 'bg-pink-800 text-pink-800',
      lineColor: 'red',
      gridLineColor: 'red',
      tickColor: colors.red['400'],
    },
  }
  hc.setOptions(hc.theme)
  return hc
}

@Component({
  selector: 'dashboard-type-chart',
  template: `
    <ng-container *ngIf="options$ | async as options">
      <highcharts-chart
        class="block w-full"
        [(update)]="update"
        [Highcharts]="Highcharts"
        [options]="options"
      ></highcharts-chart>
    </ng-container>
  `,
})
export class WidgetTypeChartComponent {
  @Input() widget!: Widget
  Highcharts: typeof Highcharts = getHighCharts()
  update = true

  get options$(): Observable<Highcharts.Options> {
    return this.widget?.data$
      ? this.widget.data$.pipe(
          map((series: any[]) => ({ series })),
          tap(() => (this.update = true)),
        )
      : of({})
  }
}

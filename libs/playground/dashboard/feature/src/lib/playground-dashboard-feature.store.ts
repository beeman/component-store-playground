import { Injectable } from '@angular/core'
import {
  DashboardDatasource,
  PlaygroundDashboardDataAccessService,
  Widget,
  WidgetType,
} from '@component-store-playground/playground/dashboard/data-access'
import { ComponentStore } from '@ngrx/component-store'

export interface PlaygroundDashboardFeatureState {
  widgets: Widget[]
}

@Injectable()
export class PlaygroundDashboardFeatureStore extends ComponentStore<PlaygroundDashboardFeatureState> {
  readonly vm$ = this.select(this.state$, ({ widgets }) => ({ widgets, types: WidgetType }))

  constructor(private readonly data: PlaygroundDashboardDataAccessService) {
    super()
    this.setState({
      widgets: [
        {
          id: 'chart',
          type: WidgetType.chart,
          title: 'Render Charts',
          data$: this.data.get(DashboardDatasource.charts),
        },
        {
          id: 'html',
          type: WidgetType.html,
          title: 'Render HTML',
          content: `<h3 class="text-pink-400">Hola Mundo!</h3>`,
        },
        {
          id: 'uptime',
          type: WidgetType.uptime,
          title: 'Render Counters',
          content: 'Application Uptime',
          data$: this.data.get(DashboardDatasource.uptime),
        },
      ],
    })
  }
}

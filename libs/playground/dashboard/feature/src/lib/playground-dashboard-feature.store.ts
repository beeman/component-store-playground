import { Injectable } from '@angular/core'
import {
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
        { id: 'uptime', type: WidgetType.uptime, title: 'Application Uptime', data$: this.data.uptime$ },
        {
          id: 'html',
          type: WidgetType.html,
          title: 'Some HTML',
          content: `<h3 class="text-pink-400">Hola Mundo!</h3>`,
        },
      ],
    })
  }
}

import { Injectable } from '@angular/core'
import { interval, Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

export enum DashboardDatasource {
  charts = 'charts',
  uptime = 'uptime',
}

@Injectable({ providedIn: 'root' })
export class PlaygroundDashboardDataAccessService {
  private readonly initTime = new Date().getTime()
  public readonly sources = new Map<DashboardDatasource, Observable<any>>()
    .set(
      DashboardDatasource.charts,
      interval(1000).pipe(
        startWith(0),
        map((i) => {
          return [
            { data: [0, 1, 2, 3, 2], type: 'area' },
            { data: [1, 2, 3, 2, 4], type: 'line' },
            { data: [2, 3, 2, 1, 0], type: 'line' },
            { data: [3, 2, 1, 2, 3], type: 'line' },
          ]
        }),
      ),
    )
    .set(
      DashboardDatasource.uptime,
      interval(1000).pipe(
        startWith(0),
        map(() => parseInt(((new Date().getTime() - this.initTime) / 1000).toString())),
      ),
    )

  constructor() {}

  get(source: DashboardDatasource) {
    return this.sources.get(source)
  }
}

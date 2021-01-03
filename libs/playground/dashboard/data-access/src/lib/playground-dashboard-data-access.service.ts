import { Injectable } from '@angular/core'
import { interval } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PlaygroundDashboardDataAccessService {
  private readonly initTime = new Date().getTime()
  constructor() {}

  uptime$ = interval(1000).pipe(
    startWith(0),
    map(() => parseInt(((new Date().getTime() - this.initTime) / 1000).toString())),
  )
}

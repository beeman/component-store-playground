import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { toData, WebWorker } from '@ng-web-apis/workers'
import { Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'

interface PlaygroundWorkerFeatureState {
  result?: any
  workerData?: any
}

@Injectable()
export class PlaygroundWorkerFeatureStore extends ComponentStore<PlaygroundWorkerFeatureState> {
  readonly vm$ = this.select(this.state$, ({ result, workerData }) => ({ result, workerData }))

  constructor() {
    super({})
    // this.setResult(this.emitter.pipe(map(() => this.startCompute())))
    // this.setWorkerData(this.workerData$)
    // this.workerThread.postMessage()
    // this.emitter.next()
  }

  readonly startWorkerEffect = this.effect(($) => $.pipe(tap(() => this.workerThread.postMessage())))

  readonly setResult = this.updater<any>((state, value) => ({ ...state, result: value }))
  readonly setWorkerData = this.updater<any>((state, value) => ({ ...state, workerData: value }))

  readonly workerThread = WebWorker.fromFunction<void, number>(this.startCompute, { type: 'classic' })
  readonly workerData$ = this.workerThread.pipe(toData())
  readonly emitter = new Subject<void>()
  readonly result$ = this.emitter.pipe(map(this.startCompute))

  startCompute(): number {
    const start = performance.now()

    Array.from({ length: 16000 }).forEach((_, index) =>
      Array.from({ length: index }).reduce<number>((sum: number) => sum + 1, 0),
    )

    return performance.now() - start
  }
}

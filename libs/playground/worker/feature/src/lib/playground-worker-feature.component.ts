import { Component } from '@angular/core'
import { PlaygroundWorkerFeatureStore } from './playground-worker-feature.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <playground-page>
        <div class="max-w-lg mx-auto grid gap-5 md:grid-cols-3 md:max-w-none mt-6 md:mt-0">
          <button
            (click)="startWorker()"
            class="w-full flex justify-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            START WORKER
          </button>

          <pre>{{ vm | json }}</pre>
        </div>
      </playground-page>
    </ng-container>
  `,
  providers: [PlaygroundWorkerFeatureStore],
})
export class PlaygroundWorkerFeatureComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: PlaygroundWorkerFeatureStore) {}

  startWorker() {
    this.store.startWorkerEffect()
  }
}

import { Component } from '@angular/core'
import { PlaygroundDashboardFeatureStore } from './playground-dashboard-feature.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <playground-page>
        <dashboard-widget-grid [widgets]="vm.widgets"></dashboard-widget-grid>
      </playground-page>
    </ng-container>
  `,
  providers: [PlaygroundDashboardFeatureStore],
})
export class PlaygroundDashboardFeatureComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: PlaygroundDashboardFeatureStore) {}
}

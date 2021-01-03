import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { PlaygroundWorkerFeatureComponent } from './playground-worker-feature.component'
import { WorkerModule } from '@ng-web-apis/workers'

@NgModule({
  declarations: [PlaygroundWorkerFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlaygroundWorkerFeatureComponent }]),
    SharedUiPageModule,
    WorkerModule,
  ],
})
export class PlaygroundWorkerFeatureModule {}

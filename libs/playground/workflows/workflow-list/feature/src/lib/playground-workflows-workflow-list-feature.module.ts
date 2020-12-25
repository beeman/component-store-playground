import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
import { PlaygroundSharedUiComponentsLoadingModule } from '@component-store-playground/playground/shared/ui/components/loading'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { WorkflowListComponent } from './workflow-list.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowListComponent }]),
    PlaygroundSharedUiComponentsIconModule,
    PlaygroundSharedUiComponentsPageModule,
    PlaygroundSharedUiComponentsLoadingModule,
  ],
  declarations: [WorkflowListComponent],
})
export class PlaygroundWorkflowsWorkflowListFeatureModule {}

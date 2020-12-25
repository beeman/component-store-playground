import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsLoadingModule } from '@component-store-playground/playground/shared/ui/components/loading'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowGroupModule } from '@component-store-playground/playground/workflows/workflow-details/ui/components/workflow-group'
import { enableMapSet } from 'immer'
import { WorkflowDetailsComponent } from './workflow-details.component'

enableMapSet()

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowDetailsComponent }]),
    PlaygroundSharedUiComponentsPageModule,
    PlaygroundSharedUiComponentsLoadingModule,
    PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowGroupModule,
  ],
  declarations: [WorkflowDetailsComponent],
})
export class PlaygroundWorkflowsWorkflowDetailsFeatureModule {}

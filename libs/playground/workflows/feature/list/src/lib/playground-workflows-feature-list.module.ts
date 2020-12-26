import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { SharedUiLoadingModule } from '@component-store-playground/shared/ui/loading'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { WorkflowListComponent } from './workflow-list.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowListComponent }]),
    SharedUiIconModule,
    SharedUiPageModule,
    SharedUiLoadingModule,
  ],
  declarations: [WorkflowListComponent],
})
export class PlaygroundWorkflowsFeatureListModule {}

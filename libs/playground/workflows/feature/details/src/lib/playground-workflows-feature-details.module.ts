import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { SharedUiLoadingModule } from '@component-store-playground/shared/ui/loading'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { enableMapSet } from 'immer'
import { WorkflowConditionComponent } from './workflow-condition/workflow-condition.component'
import { WorkflowDetailsComponent } from './workflow-details.component'
import { WorkflowGroupComponent } from './workflow-group/workflow-group.component'

enableMapSet()

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowDetailsComponent }]),
    SharedUiPageModule,
    SharedUiLoadingModule,
    SharedUiIconModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkflowDetailsComponent, WorkflowGroupComponent, WorkflowConditionComponent],
})
export class PlaygroundWorkflowsFeatureDetailsModule {}

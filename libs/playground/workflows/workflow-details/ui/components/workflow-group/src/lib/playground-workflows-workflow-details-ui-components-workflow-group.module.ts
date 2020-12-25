import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
import { PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowConditionModule } from '@component-store-playground/playground/workflows/workflow-details/ui/components/workflow-condition'
import { WorkflowGroupComponent } from './workflow-group.component'

@NgModule({
  imports: [
    CommonModule,
    PlaygroundSharedUiComponentsIconModule,
    PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowConditionModule,
  ],
  declarations: [WorkflowGroupComponent],
  exports: [WorkflowGroupComponent],
})
export class PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowGroupModule {}

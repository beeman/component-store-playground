import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
import { WorkflowConditionComponent } from './workflow-condition.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PlaygroundSharedUiComponentsIconModule],
  declarations: [WorkflowConditionComponent],
  exports: [WorkflowConditionComponent],
})
export class PlaygroundWorkflowsWorkflowDetailsUiComponentsWorkflowConditionModule {}

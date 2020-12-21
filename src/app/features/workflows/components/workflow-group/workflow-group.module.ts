import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiModule } from '../../../../ui/ui.module'
import { WorkflowConditionModule } from '../workflow-condition/workflow-condition.module'
import { WorkflowGroupComponent } from './workflow-group.component'

@NgModule({
  declarations: [WorkflowGroupComponent],
  exports: [WorkflowGroupComponent],
  imports: [CommonModule, WorkflowConditionModule, UiModule],
})
export class WorkflowGroupModule {}

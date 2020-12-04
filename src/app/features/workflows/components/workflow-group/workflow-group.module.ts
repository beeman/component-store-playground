import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WorkflowGroupComponent } from './workflow-group.component'
import { WorkflowConditionModule } from '../workflow-condition/workflow-condition.module'

@NgModule({
  declarations: [WorkflowGroupComponent],
  exports: [WorkflowGroupComponent],
  imports: [CommonModule, WorkflowConditionModule],
})
export class WorkflowGroupModule {}

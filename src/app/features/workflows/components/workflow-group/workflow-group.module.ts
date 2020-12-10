import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiIconModule } from '../../../../ui/icon/ui-icon.module'
import { WorkflowGroupComponent } from './workflow-group.component'
import { WorkflowConditionModule } from '../workflow-condition/workflow-condition.module'

@NgModule({
  declarations: [WorkflowGroupComponent],
  exports: [WorkflowGroupComponent],
  imports: [CommonModule, WorkflowConditionModule, UiIconModule],
})
export class WorkflowGroupModule {}

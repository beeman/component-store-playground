import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WorkflowConditionComponent } from './workflow-condition.component'

@NgModule({
  declarations: [WorkflowConditionComponent],
  exports: [WorkflowConditionComponent],
  imports: [CommonModule],
})
export class WorkflowConditionModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { WorkflowConditionComponent } from './workflow-condition.component'

@NgModule({
  declarations: [WorkflowConditionComponent],
  exports: [WorkflowConditionComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class WorkflowConditionModule {}

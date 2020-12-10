import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { UiIconModule } from '../../../../ui/icon/ui-icon.module'
import { WorkflowConditionComponent } from './workflow-condition.component'

@NgModule({
  declarations: [WorkflowConditionComponent],
  exports: [WorkflowConditionComponent],
  imports: [CommonModule, ReactiveFormsModule, UiIconModule],
})
export class WorkflowConditionModule {}

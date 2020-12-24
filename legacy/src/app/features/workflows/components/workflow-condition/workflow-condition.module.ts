import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { UiModule } from '../../../../ui/ui.module'
import { WorkflowConditionComponent } from './workflow-condition.component'

@NgModule({
  declarations: [WorkflowConditionComponent],
  exports: [WorkflowConditionComponent],
  imports: [CommonModule, ReactiveFormsModule, UiModule],
})
export class WorkflowConditionModule {}

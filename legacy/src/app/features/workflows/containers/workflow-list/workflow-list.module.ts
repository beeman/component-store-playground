import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../../../ui/ui.module'
import { WorkflowListComponent } from './workflow-list.component'

@NgModule({
  declarations: [WorkflowListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: WorkflowListComponent }]), UiModule],
})
export class WorkflowListModule {}

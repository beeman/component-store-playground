import { NgModule } from '@angular/core'
import { WorkflowListComponent } from './workflow-list.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { UiModule } from '../../../../ui/ui.module'

@NgModule({
  declarations: [WorkflowListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: WorkflowListComponent }]), UiModule],
})
export class WorkflowListModule {}

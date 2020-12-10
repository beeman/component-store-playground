import { NgModule } from '@angular/core'
import { UiIconModule } from '../../../../ui/icon/ui-icon.module'
import { WorkflowListComponent } from './workflow-list.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { UiModule } from '../../../../ui/ui.module'

@NgModule({
  declarations: [WorkflowListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowListComponent }]),
    UiModule,
    UiIconModule,
  ],
})
export class WorkflowListModule {}

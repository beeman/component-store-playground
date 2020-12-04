import { NgModule } from '@angular/core'
import { WorkflowDetailComponent } from './workflow-detail.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { UiModule } from '../../../../ui/ui.module'
import { WorkflowGroupModule } from '../../components/workflow-group/workflow-group.module'

@NgModule({
  declarations: [WorkflowDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WorkflowDetailComponent }]),
    UiModule,
    WorkflowGroupModule,
  ],
})
export class WorkflowDetailModule {}

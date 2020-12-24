import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { enableMapSet } from 'immer'
import { UiModule } from '../../../../ui/ui.module'
import { WorkflowGroupModule } from '../../components/workflow-group/workflow-group.module'
import { WorkflowDetailComponent } from './workflow-detail.component'

enableMapSet()

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

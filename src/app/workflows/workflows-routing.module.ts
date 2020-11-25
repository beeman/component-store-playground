import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WorkflowDetailComponent } from './detail/workflow-detail.component'

import { WorkflowListComponent } from './list/workflow-list.component'

const routes: Routes = [
  { path: '', component: WorkflowListComponent },
  { path: ':workflowId', component: WorkflowDetailComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowsRoutingModule {}

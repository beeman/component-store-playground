import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WorkflowsService } from './workflows.service'

@NgModule({
  providers: [WorkflowsService],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./containers/workflow-list/workflow-list.module').then((m) => m.WorkflowListModule),
      },
      {
        path: ':workflowId',
        loadChildren: () =>
          import('./containers/workflow-detail/workflow-detail.module').then((m) => m.WorkflowDetailModule),
      },
    ]),
  ],
})
export class WorkflowsModule {}

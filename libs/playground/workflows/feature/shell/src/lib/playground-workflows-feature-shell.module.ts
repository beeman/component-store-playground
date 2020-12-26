import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedDataAccessIdbModule } from '@component-store-playground/shared/data-access/idb'

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessIdbModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@component-store-playground/playground/workflows/feature/list').then(
            (m) => m.PlaygroundWorkflowsFeatureListModule,
          ),
      },
      {
        path: ':workflowId',
        loadChildren: () =>
          import('@component-store-playground/playground/workflows/feature/details').then(
            (m) => m.PlaygroundWorkflowsFeatureDetailsModule,
          ),
      },
    ]),
  ],
})
export class PlaygroundWorkflowsFeatureShellModule {}

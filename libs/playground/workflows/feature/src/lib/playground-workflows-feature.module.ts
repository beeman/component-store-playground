import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedIdbDataAccessModule } from '@component-store-playground/playground/shared/idb/data-access'

@NgModule({
  imports: [
    CommonModule,
    PlaygroundSharedIdbDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@component-store-playground/playground/workflows/workflow-list/feature').then(
            (m) => m.PlaygroundWorkflowsWorkflowListFeatureModule,
          ),
      },
      {
        path: ':workflowId',
        loadChildren: () =>
          import('@component-store-playground/playground/workflows/workflow-details/feature').then(
            (m) => m.PlaygroundWorkflowsWorkflowDetailsFeatureModule,
          ),
      },
    ]),
  ],
})
export class PlaygroundWorkflowsFeatureModule {}

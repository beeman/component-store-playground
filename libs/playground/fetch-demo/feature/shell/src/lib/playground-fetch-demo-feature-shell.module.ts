import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@component-store-playground/playground/fetch-demo/feature/list').then(
            (m) => m.PlaygroundFetchDemoFeatureListModule,
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('@component-store-playground/playground/fetch-demo/feature/detail').then(
            (m) => m.PlaygroundFetchDemoFeatureDetailModule,
          ),
      },
    ]),
  ],
})
export class PlaygroundFetchDemoFeatureShellModule {}

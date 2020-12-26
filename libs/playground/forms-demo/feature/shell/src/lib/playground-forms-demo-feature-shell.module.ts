import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@component-store-playground/playground/forms-demo/feature/list').then(
            (m) => m.PlaygroundFormsDemoFeatureListModule,
          ),
      },
    ]),
  ],
})
export class PlaygroundFormsDemoFeatureShellModule {}

import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@component-store-playground/playground/forms-demo/forms-demo-list/feature').then(
            (m) => m.PlaygroundFormsDemoFormsDemoListFeatureModule,
          ),
      },
    ]),
  ],
})
export class PlaygroundFormsDemoFeatureModule {}

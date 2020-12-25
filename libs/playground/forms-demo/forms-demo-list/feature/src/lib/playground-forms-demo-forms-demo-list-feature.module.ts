import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { FormsDemoListComponent } from './forms-demo-list.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormsDemoListComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'field-types' },
          {
            path: ':id',
            loadChildren: () =>
              import('@component-store-playground/playground/forms-demo/forms-demo-detail/feature').then(
                (m) => m.PlaygroundFormsDemoFormsDemoDetailFeatureModule,
              ),
          },
        ],
      },
    ]),
    PlaygroundSharedUiComponentsPageModule,
  ],
  declarations: [FormsDemoListComponent],
})
export class PlaygroundFormsDemoFormsDemoListFeatureModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { SharedUiSidenavModule } from '@component-store-playground/shared/ui/sidenav'
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
              import('@component-store-playground/playground/forms-demo/feature/details').then(
                (m) => m.PlaygroundFormsDemoFeatureDetailsModule,
              ),
          },
        ],
      },
    ]),
    SharedUiPageModule,
    SharedUiSidenavModule,
  ],
  declarations: [FormsDemoListComponent],
})
export class PlaygroundFormsDemoFeatureListModule {}

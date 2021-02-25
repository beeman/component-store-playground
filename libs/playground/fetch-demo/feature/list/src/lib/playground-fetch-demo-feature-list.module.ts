import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { SharedUiSidenavModule } from '@component-store-playground/shared/ui/sidenav'
import { FetchDemoListComponent } from './fetch-demo-list.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FetchDemoListComponent,
        children: [
          { path: '', redirectTo: 'client-filter', pathMatch: 'full' },
          {
            path: 'client-filter',
            loadChildren: () =>
              import('@component-store-playground/playground/fetch-demo/feature/client-side-filter').then(
                (m) => m.PlaygroundFetchDemoFeatureClientSideFilterModule,
              ),
          },
        ],
      },
    ]),
    SharedUiPageModule,
    SharedUiSidenavModule,
  ],
  declarations: [FetchDemoListComponent],
})
export class PlaygroundFetchDemoFeatureListModule {}

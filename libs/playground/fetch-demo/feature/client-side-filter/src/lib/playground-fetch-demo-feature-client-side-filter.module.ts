import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundFetchDemoUiPaginatorModule } from '@component-store-playground/playground/fetch-demo/ui/paginator'
import { SharedUiLoadingModule } from '@component-store-playground/shared/ui/loading'
import { ClientSideFilterComponent } from './client-side-filter.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ClientSideFilterComponent }]),
    PlaygroundFetchDemoUiPaginatorModule,
    SharedUiLoadingModule,
  ],
  declarations: [ClientSideFilterComponent],
})
export class PlaygroundFetchDemoFeatureClientSideFilterModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundFetchDemoUiPokemonCardModule } from '@component-store-playground/playground/fetch-demo/ui/pokemon-card'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { FetchDemoDetailComponent } from './fetch-demo-detail.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FetchDemoDetailComponent }]),
    PlaygroundFetchDemoUiPokemonCardModule,
    SharedUiIconModule,
  ],
  declarations: [FetchDemoDetailComponent],
})
export class PlaygroundFetchDemoFeatureDetailModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    PlaygroundSharedUiComponentsPageModule,
  ],
  declarations: [HomeComponent],
})
export class PlaygroundHomeFeatureModule {}

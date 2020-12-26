import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsFormsModule } from '@component-store-playground/playground/shared/ui/components/forms'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { AuthComponent } from './auth.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    PlaygroundSharedUiComponentsPageModule,
    PlaygroundSharedUiComponentsFormsModule,
  ],
  declarations: [AuthComponent],
})
export class PlaygroundAuthFeatureModule {}

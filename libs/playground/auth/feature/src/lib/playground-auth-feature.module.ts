import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { AuthComponent } from './auth.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedUiPageModule,
    SharedUiFormsModule,
  ],
  declarations: [AuthComponent],
})
export class PlaygroundAuthFeatureModule {}

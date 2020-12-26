import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HomeComponent }]), SharedUiPageModule],
  declarations: [HomeComponent],
})
export class PlaygroundHomeFeatureModule {}

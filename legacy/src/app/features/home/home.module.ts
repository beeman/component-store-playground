import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HomeComponent }]), UiModule],
})
export class HomeModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DevComponent } from './dev.component'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'
import { BlitzerModule } from 'blitzer'

@NgModule({
  declarations: [DevComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: DevComponent }]), UiModule, BlitzerModule],
})
export class DevModule {}

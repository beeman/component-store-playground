import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiFormModule } from '../../ui/form/ui-form.module'
import { AuthComponent } from './auth.component'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: AuthComponent }]), UiModule, UiFormModule],
})
export class AuthModule {}

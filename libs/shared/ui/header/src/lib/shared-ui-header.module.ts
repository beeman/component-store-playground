import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { HeaderComponent } from './header.component'

@NgModule({
  imports: [CommonModule, RouterModule, SharedUiIconModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedUiHeaderModule {}

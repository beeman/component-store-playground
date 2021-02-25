import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SidenavComponent } from './sidenav.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SharedUiSidenavModule {}

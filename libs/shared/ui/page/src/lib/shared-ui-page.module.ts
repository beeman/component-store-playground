import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PageComponent } from './page.component'

@NgModule({
  imports: [CommonModule],
  declarations: [PageComponent],
  exports: [PageComponent],
})
export class SharedUiPageModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
import { HeaderComponent } from './header.component'

@NgModule({
  imports: [CommonModule, RouterModule, PlaygroundSharedUiComponentsIconModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class PlaygroundSharedUiComponentsHeaderModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { PaginatorComponent } from './paginator.component'

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PlaygroundFetchDemoUiPaginatorModule {}

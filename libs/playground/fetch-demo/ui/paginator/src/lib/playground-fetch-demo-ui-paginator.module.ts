import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { PaginatorComponent } from './paginator.component'

@NgModule({
  imports: [CommonModule, SharedUiIconModule, SharedUiFormsModule, ReactiveFormsModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PlaygroundFetchDemoUiPaginatorModule {}

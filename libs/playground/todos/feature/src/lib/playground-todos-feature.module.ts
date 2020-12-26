import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { SharedUiLoadingModule } from '@component-store-playground/shared/ui/loading'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { TodosComponent } from './todos.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TodosComponent }]),
    SharedUiIconModule,
    SharedUiLoadingModule,
    SharedUiPageModule,
    SharedUiFormsModule,
  ],
  declarations: [TodosComponent],
})
export class PlaygroundTodosFeatureModule {}

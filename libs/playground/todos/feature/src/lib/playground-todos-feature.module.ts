import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsFormsModule } from '@component-store-playground/playground/shared/ui/components/forms'
import { PlaygroundSharedUiComponentsIconModule } from '@component-store-playground/playground/shared/ui/components/icon'
import { PlaygroundSharedUiComponentsLoadingModule } from '@component-store-playground/playground/shared/ui/components/loading'
import { PlaygroundSharedUiComponentsPageModule } from '@component-store-playground/playground/shared/ui/components/page'
import { TodosComponent } from './todos.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TodosComponent }]),
    PlaygroundSharedUiComponentsIconModule,
    PlaygroundSharedUiComponentsLoadingModule,
    PlaygroundSharedUiComponentsPageModule,
    PlaygroundSharedUiComponentsFormsModule,
  ],
  declarations: [TodosComponent],
})
export class PlaygroundTodosFeatureModule {}

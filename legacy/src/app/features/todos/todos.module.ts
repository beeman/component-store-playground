import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularIdbModule } from '../../angular-idb'
import { UiIconModule } from '../../ui/icon/ui-icon.module'
import { TodosComponent } from './todos.component'
import { TodosService } from './todos.service'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'
import { UiFormModule } from '../../ui/form/ui-form.module'

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TodosComponent }]),
    AngularIdbModule,
    UiModule,
    UiFormModule,
    UiIconModule,
  ],
  providers: [TodosService],
})
export class TodosModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodosDataAccessModule } from '../data-access/todos/todos-data-access.module'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './todos.component'

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodosRoutingModule, TodosDataAccessModule],
})
export class TodosModule {}

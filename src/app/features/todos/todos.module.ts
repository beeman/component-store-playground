import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodosComponent } from './todos.component'
import { TodosService } from './todos.service'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: TodosComponent }])],
  providers: [TodosService],
})
export class TodosModule {}

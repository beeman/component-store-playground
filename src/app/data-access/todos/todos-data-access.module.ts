import { NgModule } from '@angular/core'
import { TodosDataAccessService } from './todos-data-access.service'

@NgModule({
  providers: [TodosDataAccessService],
})
export class TodosDataAccessModule {}

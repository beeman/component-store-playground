import { NgModule } from '@angular/core'
import { IndexedDBModule } from 'ng-indexed-db'

@NgModule({
  imports: [IndexedDBModule.forRoot([{ name: 'default', stores: [{ name: 'todos' }, { name: 'workflows' }] }])],
})
export class SharedDataAccessIdbModule {}

import { Injectable } from '@angular/core'
import { AngularIdb, AngularIdbService } from '../../angular-idb'
import { Observable } from 'rxjs'
import { Todo } from './models/todo'

@Injectable()
export class TodosService extends AngularIdbService<Todo> {
  constructor(db: AngularIdb) {
    super(db, 'todos', { delay: 500 })
  }

  toggleTodo(todo: Todo): Observable<any> {
    return this.update(todo.id!, { ...todo, done: !todo.done })
  }
}

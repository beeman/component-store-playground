import { Injectable } from '@angular/core'
import { AngularIdb, AngularIdbService } from '@component-store-playground/playground/shared/idb/util'
import { Observable } from 'rxjs'
import { Todo } from '../models'

@Injectable({ providedIn: 'root' })
export class TodosService extends AngularIdbService<Todo> {
  constructor(db: AngularIdb) {
    super(db, 'todos', { delay: 500 })
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    return this.update(todo.id!, { ...todo, done: !todo.done })
  }
}

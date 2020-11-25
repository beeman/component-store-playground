import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { collectionData } from 'rxfire/firestore'
import { from, Observable, of } from 'rxjs'
import { delay, switchMap } from 'rxjs/operators'
import { Todo } from './todo'

@Injectable()
export class TodosDataAccessService {
  private collectionName = 'todos'
  private collection = this.afs.collection<Todo>(this.collectionName)

  todos$: Observable<Todo[]> = collectionData<Todo>(this.collection.ref, 'id').pipe(
    // Add some delay for loading state
    delay(400),
  )

  constructor(private readonly afs: AngularFirestore) {}

  addTodo(input: Todo): Observable<any> {
    return of(true).pipe(
      // Add some delay for saving state
      delay(400),
      switchMap(() => from(this.collection.add({ task: input.task, done: false }))),
    )
  }

  deleteTodo(input: Todo): Observable<any> {
    return from(this.collection.doc(input.id).delete())
  }

  toggleTodo(todo: Todo): Observable<any> {
    return from(this.collection.doc(todo.id).update({ done: !todo.done }))
  }
}

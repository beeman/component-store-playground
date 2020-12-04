import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { Todo } from './models/todo'
import { TodosService } from './todos.service'

interface TodosState {
  loading: boolean
  saving: boolean
  todos?: Todo[]
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private readonly service: TodosService) {
    super({
      saving: false,
      loading: false,
    })
  }

  readonly vm$ = this.select(({ loading, todos, saving }) => ({ loading, todos, saving }))

  // loadTodos
  loadTodos = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setState((state) => ({ ...state, loading: true }))),
      switchMap(() =>
        this.service.todos$.pipe(
          tap((todos) => {
            this.setState({
              todos,
              saving: false,
              loading: false,
            })
          }),
        ),
      ),
    ),
  )
  // addTodo
  addTodo = this.effect<string>((task$) =>
    task$.pipe(
      tap(() => this.setState((state) => ({ ...state, saving: true }))),
      mergeMap((task) =>
        this.service.addTodo({ task, done: false }).pipe(
          tap((result) => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )

  // deleteTodo
  deleteTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo) =>
        this.service.deleteTodo(todo).pipe(
          tap((result) => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )

  // toggleTodo
  toggleTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo) =>
        this.service.toggleTodo(todo).pipe(
          tap((result) => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )
}

import { Injectable } from '@angular/core'
import { Todo, TodosService } from '@component-store-playground/playground/todos/data-access'
import { ApiResponse } from '@component-store-playground/shared/util/rx'
import { tapResponse } from '@ngrx/component-store'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators'

interface TodosState {
  todos: ApiResponse<Todo[]>
  saving: boolean
  filter?: string
}

@Injectable()
export class TodosStore extends ImmerComponentStore<TodosState> {
  readonly todos$ = this.select((s) => s.todos)

  readonly vm$ = this.select(this.state$, ({ todos: { data, error, status }, filter, saving }) => {
    const filteredTodos =
      data?.filter((todo) => (filter ? todo.task.toLocaleLowerCase().includes(filter.toLowerCase()) : true)) ?? []

    return {
      filteredTodos,
      error,
      saving,
      filter,
      isEmpty: status === 'success' && !filteredTodos.length,
      isLoading: status === 'loading' && !data?.length,
    }
  })

  constructor(private readonly service: TodosService) {
    super({ todos: { status: 'idle', data: [], error: '' }, saving: false })
  }

  readonly updateTodos = this.updater<ApiResponse<Todo[]>>((state, value) => {
    state.saving = false
    state.todos = value
  })
  readonly updateFilter = this.updater<string>((state, filter) => {
    state.filter = filter
  })
  readonly updateSaving = this.updater<boolean>((state, value) => {
    state.saving = value
  })

  readonly loadTodosEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.todos$),
      switchMap(([, { data = [] }]) =>
        this.service.items(data as Todo[]).pipe(
          tapResponse((response: ApiResponse<Todo[]>) => {
            this.updateTodos(response)
          }, console.error),
        ),
      ),
    ),
  )

  readonly addTodoEffect = this.effect<string>((task$) =>
    task$.pipe(
      tap(() => this.updateSaving(true)),
      mergeMap((task) =>
        this.service.create({ task, done: false }).pipe(tapResponse(() => this.loadTodosEffect(), console.error)),
      ),
    ),
  )

  readonly deleteTodoEffect = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo) => this.service.delete(todo.id!).pipe(tapResponse(() => this.loadTodosEffect(), console.error))),
    ),
  )

  readonly toggleTodoEffect = this.effect<Todo>((todo$) => {
    return todo$.pipe(
      mergeMap((todo) => this.service.toggleTodo(todo).pipe(tapResponse(() => this.loadTodosEffect(), console.error))),
    )
  })
}

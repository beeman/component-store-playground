import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormField } from '@component-store-playground/playground/shared/ui/components/forms'
import { ApiResponse } from '@component-store-playground/playground/shared/utils/types'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { immerReducer } from 'ngrx-immer'
import { debounceTime, mergeMap, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { Todo } from '../models'
import { TodosService } from '../services'

interface TodosState {
  todos: ApiResponse<Todo[]>
  saving: boolean
  filter?: string
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  readonly form = new FormGroup({})
  readonly fields: FormField[] = [FormField.input('query', { placeholder: 'Search Todo' })]
  readonly query = this.form.valueChanges.pipe(debounceTime(250), pluck('query'))

  readonly todos$ = this.select((s) => s.todos)
  readonly saving$ = this.select((s) => s.saving)
  readonly filter$ = this.select((s) => s.filter)

  readonly vm$ = this.select(this.todos$, this.saving$, this.filter$, ({ data, error, status }, saving, filter) => {
    const filteredTodos =
      data?.filter((todo) => (filter ? todo.task.toLocaleLowerCase().includes(filter.toLowerCase()) : true)) ?? []

    return {
      filteredTodos,
      error,
      saving,
      filter,
      isEmpty: status === 'success' && !filteredTodos.length,
      isLoading: status === 'loading' && !data?.length,
      form: this.form,
      fields: this.fields,
    }
  })

  constructor(private readonly service: TodosService) {
    super({ todos: { status: 'idle', data: [], error: '' }, saving: false })
    this.updateFilter(this.query)
  }

  readonly updateTodos = this.updater<ApiResponse<Todo[]>>(
    immerReducer((state, value) => {
      state.saving = false
      state.todos = value
    }),
  )
  readonly updateFilter = this.updater<string>(
    immerReducer((state, filter) => {
      state.filter = filter
    }),
  )
  readonly updateSaving = this.updater<boolean>(
    immerReducer((state, value) => {
      state.saving = value
    }),
  )

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

  readonly removeFilterEffect = this.effect(($) => $.pipe(tap(() => this.form.setValue({ query: '' }))))

  readonly toggleTodoEffect = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo) => {
        console.log('toggle', todo)
        return this.service.toggleTodo(todo).pipe(tapResponse(() => this.loadTodosEffect(), console.error))
      }),
    ),
  )
}

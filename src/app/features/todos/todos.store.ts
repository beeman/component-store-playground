import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { debounceTime, mergeMap, pluck, switchMap, tap } from 'rxjs/operators'
import { Todo } from './models/todo'
import { TodosService } from './todos.service'
import { FormGroup } from '@angular/forms'
import { UiFormField } from '../../ui/form/ui-form-field'

interface TodosState {
  loading: boolean
  saving: boolean
  todos?: Todo[]
  filter?: string
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  readonly form = new FormGroup({})
  readonly fields: UiFormField[] = [UiFormField.input('query', { placeholder: 'Search Todo' })]

  readonly query = this.form.valueChanges.pipe(debounceTime(250), pluck('query'))

  constructor(private readonly service: TodosService) {
    super({
      saving: false,
      loading: false,
    })

    this.updateFilter(this.query)
  }

  readonly vm$ = this.select(({ loading, todos, saving, filter }) => {
    const filteredTodos = todos?.filter((todo) =>
      filter ? todo.task.toLocaleLowerCase().includes(filter.toLowerCase()) : true,
    )
    return {
      isEmpty: !loading && !filteredTodos?.length,
      isLoading: loading && !todos?.length,
      todos: filteredTodos,
      saving,
      filter,
      form: this.form,
      fields: this.fields,
    }
  })

  readonly updateFilter = this.updater<string>((state, filter) => ({ ...state, filter }))

  readonly loadTodos = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setState((state) => ({ ...state, loading: true }))),
      switchMap(() =>
        this.service.items().pipe(
          tap((todos) => {
            this.setState((state) => ({
              ...state,
              todos,
              saving: false,
              loading: false,
            }))
          }),
        ),
      ),
    ),
  )

  readonly addTodo = this.effect<string>((task$) =>
    task$.pipe(
      tap(() => this.setState((state) => ({ ...state, saving: true }))),
      mergeMap((task) =>
        this.service.create({ task, done: false }).pipe(
          tap(() => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )

  readonly deleteTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo: Todo) =>
        this.service.delete(todo.id!).pipe(
          tap(() => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )

  readonly removeFilter = this.effect(($) => $.pipe(tap(() => this.form.patchValue({ query: undefined }))))

  readonly toggleTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      mergeMap((todo) =>
        this.service.toggleTodo(todo).pipe(
          tap(() => {
            this.loadTodos()
          }),
        ),
      ),
    ),
  )
}

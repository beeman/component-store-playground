import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Todo } from '@component-store-playground/playground/todos/data-access'
import { FormField } from '@component-store-playground/shared/ui/forms'
import { debounceTime, pluck } from 'rxjs/operators'
import { TodosStore } from './stores'

@Component({
  selector: 'playground-todos',
  templateUrl: './todos.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodosStore],
})
export class TodosComponent implements OnInit {
  readonly form = new FormGroup({})
  readonly fields: FormField[] = [FormField.input('query', { placeholder: 'Search Todo' })]
  readonly query = this.form.valueChanges.pipe(debounceTime(250), pluck('query'))

  vm$ = this.todosStore.vm$

  constructor(private readonly todosStore: TodosStore) {}

  ngOnInit(): void {
    this.todosStore.updateFilter(this.query)
    this.todosStore.loadTodosEffect()
  }

  addTodo(task: HTMLInputElement): void {
    this.todosStore.addTodoEffect(task.value)
    task.value = ''
  }

  deleteTodo(todo: Todo): void {
    this.todosStore.deleteTodoEffect(todo)
  }

  toggleTodo(todo: Todo): void {
    this.todosStore.toggleTodoEffect(todo)
  }

  removeFilter(): void {
    this.form.setValue({ query: '' })
  }
}

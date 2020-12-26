import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Todo, TodosStore } from '@component-store-playground/playground/todos/data-access'

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
  readonly vm$ = this.todosStore.vm$

  constructor(private readonly todosStore: TodosStore) {}

  ngOnInit(): void {
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
    this.todosStore.removeFilterEffect()
  }
}

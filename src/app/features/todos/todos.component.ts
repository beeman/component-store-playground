import { Component, OnInit } from '@angular/core'
import { Todo } from './models/todo'
import { TodosStore } from './todos.store'
import { UiFormField } from '../../ui/form/ui-form-field'

@Component({
  providers: [TodosStore],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <app-page>
        <div
          class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden py-4 px-6"
        >
          <div class="sm:flex sm:items-center">
            <div class="flex-grow">
              <h3 class="font-semibold px-2 py-3 leading-tight">Todos</h3>
              <div class="w-full">
                <ui-form [form]="vm.form" [fields]="vm.fields"></ui-form>
                <app-loading [loading]="vm.isLoading"></app-loading>
                <ng-container *ngIf="vm.isEmpty">
                  <div
                    class="flex items-center justify-center bg-gray-100 dark:bg-gray-700 px-4 py-2 mb-3 rounded"
                    role="alert"
                  >
                    <p>There are no todos.</p>
                  </div>
                  <div class="flex items-center justify-center my-3">
                    <button
                      *ngIf="vm.filter"
                      (click)="removeFilter()"
                      class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded border-purple-200 px-4 py-2"
                    >
                      Remove filter
                    </button>
                  </div>
                </ng-container>
                <ng-container *ngIf="vm.todos as todos">
                  <ng-container *ngFor="let todo of todos">
                    <div
                      (click)="toggleTodo(todo)"
                      class="flex cursor-pointer mb-3 hover:bg-blue-lightest rounded flex align-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-2"
                    >
                      <div>
                        <div class="hover:text-blue-dark" [class]="{ 'line-through': todo.done }">
                          {{ todo.task }}
                        </div>
                      </div>
                      <button
                        class="text-gray-200 hover:text-red-600"
                        (click)="$event.stopPropagation(); deleteTodo(todo)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </ng-container>
                </ng-container>
                <div
                  class="flex cursor-pointer px-4 py-2 mb-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-lightest animate-pulse rounded"
                  *ngIf="vm.saving"
                >
                  Saving...
                </div>
              </div>
              <input
                #task
                type="text"
                required="required"
                placeholder="Add task and hit ⏎"
                (keydown.enter)="addTodo(task)"
                class="w-full text-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded  px-4 py-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </app-page>
    </ng-container>
  `,
})
export class TodosComponent implements OnInit {
  readonly vm$ = this.todosStore.vm$

  constructor(private readonly todosStore: TodosStore) {}

  ngOnInit(): void {
    this.todosStore.loadTodos()
  }

  addTodo(task: HTMLInputElement): void {
    this.todosStore.addTodo(task.value)
    task.value = ''
  }

  deleteTodo(todo: Todo): void {
    this.todosStore.deleteTodo(todo)
  }

  toggleTodo(todo: Todo): void {
    this.todosStore.toggleTodo(todo)
  }

  removeFilter(): void {
    this.todosStore.removeFilter()
  }
}

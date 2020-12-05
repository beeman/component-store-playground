import { Component, OnInit } from '@angular/core'
import { Todo } from './models/todo'
import { TodosStore } from './todos.store'

@Component({
  providers: [TodosStore],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <app-page>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden py-4 px-6">
          <div class="sm:flex sm:items-center">
            <div class="flex-grow">
              <h3 class="font-normal px-2 py-3 leading-tight">Todos</h3>
              <div class="w-full">
                <app-loading [loading]="vm.isLoading"></app-loading>
                <ng-container *ngIf="vm.isEmpty">
                  <div
                    class="flex items-center justify-center bg-gray-100  text-sm font-bold  p-16  rounded"
                    role="alert"
                  >
                    <p>There are no todos.</p>
                  </div>
                </ng-container>
                <ng-container *ngIf="vm.todos as todos">
                  <ng-container *ngFor="let todo of todos">
                    <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                      <div class="py-3">
                        <button class="text-red-600" (click)="deleteTodo(todo)">
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                      <div class="h-10 py-3 px-1">
                        <p
                          class="hover:text-blue-dark"
                          [class]="{ 'line-through': todo.done }"
                          (click)="toggleTodo(todo)"
                        >
                          {{ todo.task }}
                        </p>
                      </div>
                    </div>
                  </ng-container>
                </ng-container>
                <div
                  class="flex cursor-pointer p-1 bg-gray-100 hover:bg-blue-lightest animate-pulse rounded"
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
                class="my-2 w-full text-lg bg-gray-100 text-grey-darkest rounded h-10 p-3 focus:outline-none"
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
}

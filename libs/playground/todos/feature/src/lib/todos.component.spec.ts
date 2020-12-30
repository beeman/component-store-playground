import { RouterTestingModule } from '@angular/router/testing'
import { TodosService } from '@component-store-playground/playground/todos/data-access'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { TodosStore } from './stores'

import { TodosComponent } from './todos.component'

describe('TodosComponent', () => {
  let spectator: Spectator<TodosComponent>
  let store: SpyObject<TodosStore>
  const createComponent = createComponentFactory({
    component: TodosComponent,
    imports: [RouterTestingModule],
    mocks: [TodosService],
    componentProviders: [
      mockProvider(TodosStore, {
        vm$: of({ filteredTodos: [], error: '', saving: false, isLoading: false, isEmpty: true, filter: undefined }),
        updateFilter: jest.fn(),
        loadTodosEffect: jest.fn(),
        addTodoEffect: jest.fn(),
        deleteTodoEffect: jest.fn(),
        toggleTodoEffect: jest.fn(),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
    store = spectator.inject(TodosStore, true)
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy()
      expect(spectator.component.vm$).toBe(store.vm$)
    })

    it('should call updateFilter and loadTodosEffect on init', () => {
      expect(store.loadTodosEffect).toHaveBeenCalled()
      expect(store.updateFilter).toHaveBeenCalledWith(spectator.component.query)
    })

    it('should render initial properly', () => {
      expect(spectator.query('h3')).toHaveText('Todos')
      expect(spectator.query('div[role="alert"] > p')).toHaveText('There are no todos.')
      expect(spectator.query('input[type="text"]')).toBeTruthy()
    })
  })

  it('should call store.addTodoEffect on addTodo', () => {
    spectator.component.addTodo({ value: 'new todo' } as HTMLInputElement)
    expect(store.addTodoEffect).toHaveBeenCalledWith('new todo')
  })

  it('should call deleteTodoEffect on deleteTodo', () => {
    const todoToDelete = { id: '123', task: 'foo', done: false }
    spectator.component.deleteTodo(todoToDelete)
    expect(store.deleteTodoEffect).toHaveBeenCalledWith(todoToDelete)
  })

  it('should call toggleTodoEffect on toggleTodo', () => {
    const todoToToggle = { id: '123', task: 'foo', done: false }
    spectator.component.toggleTodo(todoToToggle)
    expect(store.toggleTodoEffect).toHaveBeenCalledWith(todoToToggle)
  })
})

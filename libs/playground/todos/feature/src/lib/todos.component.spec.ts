import { RouterTestingModule } from '@angular/router/testing'
import { TodosService } from '@component-store-playground/playground/todos/data-access'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { SharedUiIconModule } from '@component-store-playground/shared/ui/icon'
import { SharedUiLoadingModule } from '@component-store-playground/shared/ui/loading'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { TodosStore } from './stores'

import { TodosComponent } from './todos.component'

describe('TodosComponent', () => {
  let spectator: Spectator<TodosComponent>
  let store: SpyObject<TodosStore>
  const createComponent = createComponentFactory({
    component: TodosComponent,
    imports: [SharedUiFormsModule, SharedUiPageModule, SharedUiIconModule, SharedUiLoadingModule, RouterTestingModule],
    mocks: [TodosService],
    componentProviders: [
      mockProvider(TodosStore, {
        vm$: of({ filteredTodos: [], error: '', saving: false, isLoading: false, isEmpty: false, filter: undefined }),
        updateFilter: jest.fn(),
        loadTodosEffect: jest.fn(),
        addTodoEffect: jest.fn(),
      }),
    ],
  })

  beforeEach(() => {
    spectator = createComponent()
    store = spectator.inject(TodosStore, true)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.component.vm$).toBe(store.vm$)
    expect(store.loadTodosEffect).toHaveBeenCalled()
    expect(store.updateFilter).toHaveBeenCalledWith(spectator.component.query)
  })

  it('should call updateFilter', () => {})
})

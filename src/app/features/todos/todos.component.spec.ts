import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TodosComponent } from './todos.component'
import { TodosService } from './todos.service'
import { of } from 'rxjs'
import { Todo } from './models/todo'

describe('TodosComponent', () => {
  let component: TodosComponent
  let fixture: ComponentFixture<TodosComponent>

  const TODOS: Todo[] = [{ id: '1', task: 'TODO ITEM', done: false }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [{ provide: TodosService, useValue: { todos$: of(TODOS) } }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

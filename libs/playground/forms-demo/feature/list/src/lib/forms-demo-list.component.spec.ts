import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsDemoListComponent } from './forms-demo-list.component'

describe('FormsDemoListComponent', () => {
  let component: FormsDemoListComponent
  let fixture: ComponentFixture<FormsDemoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsDemoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDemoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowDetailComponent } from './workflow-detail.component'

describe('FormsComponent', () => {
  let component: WorkflowDetailComponent
  let fixture: ComponentFixture<WorkflowDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowDetailComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

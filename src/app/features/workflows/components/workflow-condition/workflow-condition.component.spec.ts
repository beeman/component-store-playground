import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowConditionComponent } from './workflow-condition.component'

describe('WorkflowConditionComponent', () => {
  let component: WorkflowConditionComponent
  let fixture: ComponentFixture<WorkflowConditionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowConditionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowConditionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

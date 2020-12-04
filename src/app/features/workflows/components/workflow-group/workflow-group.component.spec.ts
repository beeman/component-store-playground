import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowGroupComponent } from './workflow-group.component'

describe('WorkflowGroupComponent', () => {
  let component: WorkflowGroupComponent
  let fixture: ComponentFixture<WorkflowGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowGroupComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

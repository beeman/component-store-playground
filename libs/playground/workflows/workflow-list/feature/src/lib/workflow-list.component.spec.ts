import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowListComponent } from './workflow-list.component'

describe('WorkflowListComponent', () => {
  let component: WorkflowListComponent
  let fixture: ComponentFixture<WorkflowListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

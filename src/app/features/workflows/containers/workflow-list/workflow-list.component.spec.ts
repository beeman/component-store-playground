import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowListComponent } from './workflow-list.component'
import { Workflow } from '../../models/workflow'
import { WorkflowType } from '../../models/workflow-item'
import { WorkflowsService } from '../../workflows.service'
import { of } from 'rxjs'

describe('WorkflowListComponent', () => {
  let component: WorkflowListComponent
  let fixture: ComponentFixture<WorkflowListComponent>
  const WORKFLOWS: Workflow[] = [{ id: '1', name: 'TEST WORKFLOW', group: { id: 'group', type: WorkflowType.group } }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowListComponent],
      providers: [{ provide: WorkflowsService, useValue: { workflows$: of(WORKFLOWS) } }],
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

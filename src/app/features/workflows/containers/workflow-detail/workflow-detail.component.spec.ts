import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { WorkflowDetailComponent } from './workflow-detail.component'
import { Workflow } from '../../models/workflow'
import { WorkflowType } from '../../models/workflow-item'
import { WorkflowsService } from '../../workflows.service'
import { RouterTestingModule } from '@angular/router/testing'

describe('WorkflowDetailComponent', () => {
  let component: WorkflowDetailComponent
  let fixture: ComponentFixture<WorkflowDetailComponent>
  const WORKFLOWS: Workflow[] = [{ id: '1', name: 'TEST WORKFLOW', group: { id: 'group', type: WorkflowType.group } }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowDetailComponent],
      providers: [{ provide: WorkflowsService, useValue: { todos$: of(WORKFLOWS) } }],
      imports: [RouterTestingModule],
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

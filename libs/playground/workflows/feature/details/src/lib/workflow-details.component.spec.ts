import { Workflow, WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { WorkflowDetailsStore } from './stores'

import { WorkflowDetailsComponent } from './workflow-details.component'

describe('WorkflowDetailsComponent', () => {
  let spectator: Spectator<WorkflowDetailsComponent>
  let store: SpyObject<WorkflowDetailsStore>

  const workflow: Workflow = { id: '1', name: 'foo', group: { id: '2', type: WorkflowType.group, children: [] } }

  const createComponent = createComponentFactory({
    component: WorkflowDetailsComponent,
    componentProviders: [
      mockProvider(WorkflowDetailsStore, {
        vm$: of({
          workflow,
          loading: status === 'loading',
          maxDepth: 2,
          root: '1',
        }),
        saveWorkflowEffect: jest.fn(),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
    store = spectator.inject(WorkflowDetailsStore, true)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.component.vm$).toBe(store.vm$)
  })

  it('should render workflow name', () => {
    expect(spectator.query('h3')).toHaveText(workflow.name)
  })

  it('should invoke store.saveWorkflowEffect on saveWorkflow', () => {
    const button = spectator.query('button')
    expect(button).toBeTruthy()
    spectator.click(button!)
    expect(store.saveWorkflowEffect).toHaveBeenCalled()
  })
})

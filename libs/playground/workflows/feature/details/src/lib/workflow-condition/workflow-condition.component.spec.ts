import { WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { WorkflowConditionStore } from '../stores'

import { WorkflowConditionComponent } from './workflow-condition.component'

describe('WorkflowConditionComponent', () => {
  let spectator: Spectator<WorkflowConditionComponent>
  let store: SpyObject<WorkflowConditionStore>

  const createComponent = createComponentFactory({
    component: WorkflowConditionComponent,
    componentProviders: [
      mockProvider(WorkflowConditionStore, {
        vm$: of({ condition: { id: '2', type: WorkflowType.condition, parentId: '1', value: false } }),
        deleteConditionEffect: jest.fn(),
        updateConditionEffect: jest.fn(),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent({ props: { conditionId: '2' } })
    store = spectator.inject(WorkflowConditionStore, true)
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy()
      expect(spectator.component.vm$).toBeTruthy()
    })

    it('should invoke setConditionId and updateConditionEffect', () => {
      expect(store.setConditionId).toHaveBeenCalledWith('2')
      expect(store.updateConditionEffect).toHaveBeenCalledWith(spectator.component.allowDeleteControl.valueChanges)
    })
  })

  it('should call deleteConditionEffect on deleteCondition', () => {
    spectator.component.deleteCondition()
    expect(store.deleteConditionEffect).toHaveBeenCalled()
  })
})

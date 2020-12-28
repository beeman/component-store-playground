import { WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { take } from 'rxjs/operators'
import { WorkflowGroupStore } from '../stores'

import { WorkflowGroupComponent } from './workflow-group.component'

describe('WorkflowGroupComponent', () => {
  let spectator: Spectator<WorkflowGroupComponent>
  let store: SpyObject<WorkflowGroupStore>

  const groupId = '2'
  const level = 1

  const createComponent = createComponentFactory({
    component: WorkflowGroupComponent,
    componentProviders: [
      mockProvider(WorkflowGroupStore, {
        vm$: of({
          level,
          group: { id: groupId, parentId: '1', type: WorkflowType.group, children: [] },
          isCollapsed: false,
          isAtMaxDepth: false,
          isSubGroup: true,
          hasNoChildren: true,
          nextLevel: 2,
          collapsedIcon: 'minusCircle',
        }),
        addGroupEffect: jest.fn(),
        addConditionEffect: jest.fn(),
        removeEffect: jest.fn(),
        toggleCollapse: jest.fn(),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent({ props: { groupId, level } })
    store = spectator.inject(WorkflowGroupStore, true)
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy()
      expect(spectator.component.vm$).toBe(store.vm$)
    })

    it('should call setGroup on init', () => {
      expect(store.setGroup).toHaveBeenCalledWith(groupId, level)
    })

    it('should vm$ emit on init', () => {
      spectator.component.vm$.pipe(take(1)).subscribe(({ group, level: levelFromVm }) => {
        expect(group!.id).toEqual(groupId)
        expect(levelFromVm).toEqual(level)
      })
    })
  })

  it('should call addGroupEffect on addGroup', () => {
    spectator.component.addGroup()
    expect(store.addGroupEffect).toHaveBeenCalled()
  })

  it('should call addConditionEffect on addCondition', () => {
    spectator.component.addCondition()
    expect(store.addConditionEffect).toHaveBeenCalled()
  })

  it('should call removeEffect on deleteGroup', () => {
    spectator.component.deleteGroup()
    expect(store.removeEffect).toHaveBeenCalled()
  })

  it('should call toggleCollapse on toggleCollapse', () => {
    spectator.component.toggleCollapse()
    expect(store.toggleCollapse).toHaveBeenCalled()
  })
})

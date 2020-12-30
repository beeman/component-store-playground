import { NormalizedWorkflowGroup, WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import * as workflowUtil from '@component-store-playground/playground/workflows/util'
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator/jest'
import { of, ReplaySubject } from 'rxjs'
import {
  normalizedFirstGroup,
  normalizedFirstGroupNoChild,
  normalizedRootGroup,
  normalizedRootGroupWithFirstLevelGroupNoChild,
} from './fixtures.spec'
import { WorkflowDetailsStore } from './workflow-details.store'
import { WorkflowGroupStore } from './workflow-group.store'

describe('WorkflowGroupStore', () => {
  let spectator: SpectatorService<WorkflowGroupStore>
  let vm$: typeof WorkflowGroupStore.prototype['vm$']
  let mockedDetailsStore: SpyObject<WorkflowDetailsStore>

  const spiedRandomId = jest.spyOn(workflowUtil, 'randomId')

  const groupNodesSubject = new ReplaySubject<Map<string, NormalizedWorkflowGroup>>(1)

  const getVm = (
    partial: Partial<{
      level: number
      group: NormalizedWorkflowGroup | undefined
      isCollapsed: boolean
      isAtMaxDepth: boolean
      isSubGroup: boolean
      hasNoChildren: boolean
      nextLevel: number
      collapsedIcon: string
    }> = {},
  ) => ({
    level: 1,
    group: normalizedFirstGroupNoChild,
    isCollapsed: false,
    isAtMaxDepth: false,
    isSubGroup: true,
    hasNoChildren: true,
    nextLevel: 2,
    collapsedIcon: 'minusCircle',
    ...partial,
  })

  const mockRandomId = () => {
    const mockedId = '99'
    spiedRandomId.mockReturnValueOnce(mockedId)
    return mockedId
  }

  const createService = createServiceFactory({
    service: WorkflowGroupStore,
    providers: [
      mockProvider(WorkflowDetailsStore, {
        groupNodes$: groupNodesSubject.asObservable(),
        maxDepth$: of(2),
        addGroup: jest.fn(),
        addCondition: jest.fn(),
        removeGroup: jest.fn(),
      }),
    ],
  })

  beforeEach(() => {
    spectator = createService()
    vm$ = spectator.service.vm$
    mockedDetailsStore = spectator.inject(WorkflowDetailsStore)

    groupNodesSubject.next(
      new Map<string, NormalizedWorkflowGroup>()
        .set(normalizedRootGroupWithFirstLevelGroupNoChild.id, normalizedRootGroupWithFirstLevelGroupNoChild)
        .set(normalizedFirstGroupNoChild.id, normalizedFirstGroupNoChild),
    )
  })

  afterEach(() => {
    mockedDetailsStore.removeGroup.mockReset()
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.service).toBeTruthy()
      expect(vm$).toBeTruthy()
    })

    it('should vm$ not emit', () => {
      const observerSpy = subscribeSpyTo(vm$)
      expect(observerSpy.receivedNext()).toEqual(false)
    })
  })

  it('should set initial state on setGroup', () => {
    const observerSpy = subscribeSpyTo(vm$)
    spectator.service.setGroup(normalizedFirstGroupNoChild.id, 1)

    expect(observerSpy.getLastValue()).toEqual(getVm())
  })

  it('should call detailsStore.addGroup on addGroupEffect', () => {
    const mockedNewGroupId = mockRandomId()
    const updatedGroup = {
      ...normalizedFirstGroupNoChild,
      children: [{ type: WorkflowType.group, id: mockedNewGroupId }],
    }

    groupNodesSubject.next(
      new Map<string, NormalizedWorkflowGroup>()
        .set(normalizedRootGroupWithFirstLevelGroupNoChild.id, normalizedRootGroupWithFirstLevelGroupNoChild)
        .set(updatedGroup.id, updatedGroup),
    )

    spectator.service.setGroup(normalizedFirstGroupNoChild.id, 1)

    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.addGroupEffect()

    expect(mockedDetailsStore.addGroup).toHaveBeenCalledWith(normalizedFirstGroupNoChild.id)
    expect(observerSpy.getLastValue()).toEqual(getVm({ group: updatedGroup, hasNoChildren: false }))
  })

  it('should call detailsStore.addCondition on addConditionEffect', () => {
    const mockedNewConditionId = mockRandomId()
    const updatedGroup = {
      ...normalizedFirstGroupNoChild,
      children: [{ type: WorkflowType.condition, id: mockedNewConditionId }],
    }

    groupNodesSubject.next(
      new Map<string, NormalizedWorkflowGroup>()
        .set(normalizedRootGroupWithFirstLevelGroupNoChild.id, normalizedRootGroupWithFirstLevelGroupNoChild)
        .set(updatedGroup.id, updatedGroup),
    )

    spectator.service.setGroup(normalizedFirstGroupNoChild.id, 1)

    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.addConditionEffect()

    expect(mockedDetailsStore.addCondition).toHaveBeenCalledWith(normalizedFirstGroupNoChild.id)
    expect(observerSpy.getLastValue()).toEqual(getVm({ group: updatedGroup, hasNoChildren: false }))
  })

  it('should remove group without alert for group without children', () => {
    spectator.service.setGroup(normalizedFirstGroupNoChild.id, 1)

    const spiedConfirm = jest.spyOn(window, 'confirm')
    const observerSpy = subscribeSpyTo(vm$)
    spectator.service.removeEffect()

    expect(spiedConfirm).not.toHaveBeenCalled()
    expect(mockedDetailsStore.removeGroup).toHaveBeenCalledWith(normalizedFirstGroupNoChild.id)

    groupNodesSubject.next(new Map<string, NormalizedWorkflowGroup>())
    expect(observerSpy.getLastValue()).toEqual(getVm({ group: undefined }))
  })

  it('should remove group with alert for group with children', () => {
    const spiedConfirm = jest.spyOn(window, 'confirm')
    spiedConfirm.mockReturnValueOnce(true)

    groupNodesSubject.next(
      new Map<string, NormalizedWorkflowGroup>()
        .set(normalizedRootGroup.id, normalizedRootGroup)
        .set(normalizedFirstGroup.id, normalizedFirstGroup),
    )

    spectator.service.setGroup(normalizedFirstGroup.id, 1)
    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.removeEffect()

    expect(spiedConfirm).toHaveBeenCalled()
    expect(mockedDetailsStore.removeGroup).toHaveBeenCalledWith(normalizedFirstGroup.id)

    groupNodesSubject.next(new Map<string, NormalizedWorkflowGroup>())
    expect(observerSpy.getLastValue()).toEqual(getVm({ group: undefined }))
  })

  it('should NOT remove group without alert confirm for group with children', () => {
    const spiedConfirm = jest.spyOn(window, 'confirm')
    spiedConfirm.mockReturnValueOnce(false)

    groupNodesSubject.next(
      new Map<string, NormalizedWorkflowGroup>()
        .set(normalizedRootGroup.id, normalizedRootGroup)
        .set(normalizedFirstGroup.id, normalizedFirstGroup),
    )

    spectator.service.setGroup(normalizedFirstGroup.id, 1)
    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.removeEffect()

    expect(spiedConfirm).toHaveBeenCalled()
    expect(mockedDetailsStore.removeGroup).not.toHaveBeenCalled()
    expect(observerSpy.getLastValue()).toEqual(getVm({ group: normalizedFirstGroup, hasNoChildren: false }))
  })

  it('should toggle collapse', () => {
    spectator.service.setGroup(normalizedFirstGroupNoChild.id, 1)
    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.toggleCollapse()
    expect(observerSpy.getLastValue()).toEqual(getVm({ isCollapsed: true, collapsedIcon: 'plusCircle' }))

    spectator.service.toggleCollapse()
    expect(observerSpy.getLastValue()).toEqual(getVm())
  })
})

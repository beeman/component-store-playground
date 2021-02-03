import { ActivatedRoute } from '@angular/router'
import { Workflow, WorkflowsService, WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import * as workflowUtil from '@component-store-playground/playground/workflows/util'
import { WorkflowHelper } from '@component-store-playground/playground/workflows/util'
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator/jest'
import { combineLatest, of } from 'rxjs'
import { map, pluck, take } from 'rxjs/operators'
import { normalizedFirstGroup, normalizedRootGroup, rootGroup, secondLevelCondition } from './fixtures.spec'
import { WorkflowDetailsStore } from './workflow-details.store'

describe('WorkflowDetailsStore', () => {
  let spectator: SpectatorService<WorkflowDetailsStore>
  let vm$: typeof WorkflowDetailsStore.prototype['vm$']
  let mockedService: SpyObject<WorkflowsService>
  let route: SpyObject<ActivatedRoute>

  const spiedNormalize = jest.spyOn(WorkflowHelper, 'normalize')
  const spiedDeleteNodeRecursive = jest.spyOn(WorkflowHelper, 'deleteGroupRecursive')
  const spiedDenormalize = jest.spyOn(WorkflowHelper, 'denormalize')
  const spiedRandomId = jest.spyOn(workflowUtil, 'randomId')

  const createService = createServiceFactory({
    service: WorkflowDetailsStore,
    providers: [
      mockProvider(WorkflowsService, {
        item: () =>
          of({
            status: 'success',
            error: '',
            data: { id: '1', name: 'foo', group: rootGroup, maxDepth: 2 },
          }),
      }),
      mockProvider(ActivatedRoute, {
        params: of({ workflowId: '1' }),
      }),
    ],
  })

  const mockRandomId = () => {
    const mockedId = '99'
    spiedRandomId.mockReturnValueOnce(mockedId)
    return mockedId
  }

  const getVm = (
    partial: Partial<{
      workflow: Workflow
      loading: boolean
      root: string
      currentMaxLevel: number
    }> = {},
  ) => ({ workflow: null, currentMaxLevel: 0, loading: false, root: undefined, ...partial })

  beforeEach(() => {
    spectator = createService()
    vm$ = spectator.service.vm$
    mockedService = spectator.inject(WorkflowsService)
    route = spectator.inject(ActivatedRoute)
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.service).toBeTruthy()
      expect(vm$).toBeTruthy()
    })

    it('should call service.item with route.workflowId on initializeEffect', () => {
      route.params.pipe(pluck('workflowId'), take(1)).subscribe((workflowId) => {
        expect(mockedService.item).toHaveBeenCalledWith(workflowId)
      })
    })

    it('should vm$ emit default values after effect ran', () => {
      const observerSpy = subscribeSpyTo(vm$)
      expect(observerSpy.getValues()).toEqual([
        getVm({
          workflow: { id: '1', name: 'foo', group: rootGroup, maxDepth: 2 },
          root: rootGroup.id,
          currentMaxLevel: 1,
        }),
      ])
    })

    it('should call WorkflowHelper.normalize when service.item returns workflow', () => {
      expect(spiedNormalize).toHaveBeenCalledWith(rootGroup)
    })
  })

  it('should addGroup to groupNodes', () => {
    const mockedNewGroupId = mockRandomId()

    spectator.service.addGroup({ parentId: normalizedRootGroup.id, level: normalizedRootGroup.level })
    const observerSpy = subscribeSpyTo(
      spectator.service.groupNodes$.pipe(
        map((groupNodes) => groupNodes.get(mockedNewGroupId)),
        take(1),
      ),
    )
    expect(observerSpy.getLastValue()).toEqual({
      id: mockedNewGroupId,
      type: WorkflowType.group,
      children: [],
      parentId: normalizedRootGroup.id,
      level: 1,
    })
  })

  it('should addCondition to conditionNodes', () => {
    const mockedNewConditionId = mockRandomId()
    spectator.service.addCondition(normalizedRootGroup.id)

    const observerSpy = subscribeSpyTo(
      spectator.service.conditionNodes$.pipe(
        map((conditionNodes) => conditionNodes.get(mockedNewConditionId)),
        take(1),
      ),
    )

    expect(observerSpy.getLastValue()).toEqual({
      id: mockedNewConditionId,
      parentId: normalizedRootGroup.id,
      type: WorkflowType.condition,
      value: false,
    })
  })

  it('should remove group and all its children', () => {
    const groupNodesObserverSpy = subscribeSpyTo(spectator.service.groupNodes$)
    const conditionNodesObserverSpy = subscribeSpyTo(spectator.service.conditionNodes$)

    expect(groupNodesObserverSpy.getLastValue()!.size).toEqual(2)
    expect(groupNodesObserverSpy.getLastValue()!.get(normalizedFirstGroup.id)).toEqual(normalizedFirstGroup)

    expect(conditionNodesObserverSpy.getLastValue()!.size).toEqual(1)

    spectator.service.removeGroup(normalizedFirstGroup.id)

    expect(spiedDeleteNodeRecursive).toHaveBeenCalled()

    expect(groupNodesObserverSpy.getLastValue()!.size).toEqual(1)
    expect(groupNodesObserverSpy.getLastValue()!.get(normalizedFirstGroup.id)).not.toBeTruthy()

    expect(conditionNodesObserverSpy.getLastValue()!.size).toEqual(0)
  })

  it('should remove condition', () => {
    const observerSpy = subscribeSpyTo(spectator.service.conditionNodes$)
    expect(observerSpy.getLastValue()!.size).toEqual(1)
    expect(observerSpy.getLastValue()!.get(secondLevelCondition.id)).toEqual(secondLevelCondition)

    spectator.service.removeCondition(secondLevelCondition.id)

    expect(observerSpy.getLastValue()!.size).toEqual(0)
    expect(observerSpy.getLastValue()!.get(secondLevelCondition.id)).not.toBeTruthy()
  })

  it('should update condition', () => {
    const observerSpy = subscribeSpyTo(spectator.service.conditionNodes$)

    expect(observerSpy.getLastValue()!.get(secondLevelCondition.id)).toEqual(secondLevelCondition)

    spectator.service.updateCondition({ ...secondLevelCondition, value: true })

    expect(observerSpy.getLastValue()!.get(secondLevelCondition.id)).toEqual({ ...secondLevelCondition, value: true })
  })

  it('should call denormalize and service.update on saveWorkflowEffect', () => {
    spectator.service.saveWorkflowEffect({ workflowName: 'workflow name', maxDepth: 3 })

    combineLatest([
      spectator.service.groupNodes$.pipe(take(1)),
      spectator.service.conditionNodes$.pipe(take(1)),
    ]).subscribe(([groupNodes, conditionNodes]) => {
      expect(spiedDenormalize).toHaveBeenCalledWith(groupNodes, conditionNodes)
    })

    expect(mockedService.update).toHaveBeenCalled()
  })
})

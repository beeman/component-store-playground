import { WorkflowCondition } from '@component-store-playground/playground/workflows/data-access'
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator/jest'
import { ReplaySubject } from 'rxjs'
import { secondLevelCondition } from './fixtures.spec'
import { WorkflowConditionStore } from './workflow-condition.store'
import { WorkflowDetailsStore } from './workflow-details.store'

describe('WorkflowConditionStore', () => {
  let spectator: SpectatorService<WorkflowConditionStore>
  let vm$: typeof WorkflowConditionStore.prototype['vm$']
  let mockedDetailsStore: SpyObject<WorkflowDetailsStore>

  const conditionNodesSubject = new ReplaySubject<Map<string, WorkflowCondition>>(1)

  const createService = createServiceFactory({
    service: WorkflowConditionStore,
    providers: [
      mockProvider(WorkflowDetailsStore, {
        conditionNodes$: conditionNodesSubject.asObservable(),
        removeCondition: jest.fn(),
        updateCondition: jest.fn(),
      }),
    ],
  })

  beforeEach(() => {
    spectator = createService()
    vm$ = spectator.service.vm$
    mockedDetailsStore = spectator.inject(WorkflowDetailsStore)
    conditionNodesSubject.next(new Map<string, WorkflowCondition>().set(secondLevelCondition.id, secondLevelCondition))
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

  it('should set initial state', () => {
    const observerSpy = subscribeSpyTo(vm$)
    spectator.service.setConditionId(secondLevelCondition.id)

    expect(observerSpy.getLastValue()).toEqual({ condition: secondLevelCondition })
  })

  it('should call detailsStore.removeCondition on deleteConditionEffect', () => {
    spectator.service.setConditionId(secondLevelCondition.id)

    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.deleteConditionEffect()

    expect(mockedDetailsStore.removeCondition).toHaveBeenCalledWith(secondLevelCondition.id)

    conditionNodesSubject.next(new Map<string, WorkflowCondition>())

    expect(observerSpy.getLastValue()).toEqual({ condition: undefined })
  })

  it('should call detailsStore.updateCondition on updateConditionEffect', () => {
    spectator.service.setConditionId(secondLevelCondition.id)
    const updatedCondition = { ...secondLevelCondition, value: true }

    const observerSpy = subscribeSpyTo(vm$)

    spectator.service.updateConditionEffect(updatedCondition.value)

    expect(mockedDetailsStore.updateCondition).toHaveBeenCalledWith(updatedCondition)

    conditionNodesSubject.next(new Map<string, WorkflowCondition>().set(updatedCondition.id, updatedCondition))

    expect(observerSpy.getLastValue()).toEqual({ condition: updatedCondition })
  })
})

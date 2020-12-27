import { Workflow, WorkflowsService } from '@component-store-playground/playground/workflows/data-access'
import { ApiResponse } from '@component-store-playground/shared/util/rx'
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'
import { WorkflowListStore } from './workflow-list.store'

describe('WorkflowListStore', () => {
  let spectator: SpectatorService<WorkflowListStore>
  let vm$: typeof WorkflowListStore.prototype['vm$']

  const getVm = (
    partial: Partial<{ workflows: Workflow[]; isEmpty: boolean; isLoading: boolean; saving: boolean }> = {},
  ) => ({
    workflows: [],
    isEmpty: false,
    isLoading: false,
    saving: false,
    ...partial,
  })

  const createService = createServiceFactory({
    service: WorkflowListStore,
    mocks: [WorkflowsService],
  })

  beforeEach(() => {
    spectator = createService()
    vm$ = spectator.service.vm$
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.service).toBeTruthy()
      expect(vm$).toBeTruthy()
    })

    it('should vm$ emit default value', () => {
      const observerSpy = subscribeSpyTo(vm$)
      expect(observerSpy.getValues()).toEqual([getVm()])
    })
  })

  describe('effects', () => {
    let service: SpyObject<WorkflowsService>

    const getMockedItems = (data: Workflow[], prev: Workflow[] = []) =>
      of<ApiResponse<Workflow[]>>(
        {
          data: prev,
          status: 'loading',
          error: '',
        },
        {
          data,
          status: 'success',
          error: '',
        },
      )

    beforeEach(() => {
      service = spectator.inject(WorkflowsService)
    })

    describe('loadWorkflowsEffect', () => {
      it('should call service.items properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        service.items.mockReturnValueOnce(getMockedItems([]))

        spectator.service.loadWorkflowsEffect()

        expect(service.items).toHaveBeenCalledWith([])
        expect(observerSpy.getLastValue()).toEqual(getVm({ workflows: [], isEmpty: true }))
      })
    })
  })
})

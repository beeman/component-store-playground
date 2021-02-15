import {
  Workflow,
  WorkflowGroup,
  WorkflowsService,
  WorkflowType,
} from '@component-store-playground/playground/workflows/data-access'
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

      it('should call service.items with previous workflow$', () => {
        const prevData: Workflow[] = [
          { id: '1', name: 'foo', group: { id: '2', type: WorkflowType.group, children: [], level: 0 }, maxDepth: 2 },
        ]
        spectator.service.patchState({ workflows: { data: prevData, status: 'success', error: '' } })

        service.items.mockReturnValueOnce(getMockedItems(prevData, prevData))

        const observerSpy = subscribeSpyTo(vm$)

        spectator.service.loadWorkflowsEffect()

        expect(service.items).toHaveBeenCalledWith(prevData)
        expect(observerSpy.getLastValue()).toEqual(getVm({ workflows: prevData }))
      })
    })

    it('should call service methods properly on addWorkflowEffect', () => {
      const observerSpy = subscribeSpyTo(vm$)
      service.create.mockReturnValueOnce(
        of({ id: '1', name: 'foo', group: { id: '2', type: WorkflowType.group, children: [], level: 0 }, maxDepth: 2 }),
      )

      const addWorkflowInput: { name: string; group: WorkflowGroup } = {
        name: 'new workflow',
        group: { id: '2', type: WorkflowType.group, children: [], level: 0 },
      }
      spectator.service.addWorkflowEffect(addWorkflowInput)

      expect(observerSpy.getLastValue()).toEqual(getVm({ saving: true }))
      expect(service.create).toHaveBeenCalledWith({ ...addWorkflowInput, maxDepth: 2 })
      expect(service.items).toHaveBeenCalled()
    })

    it('should call service.delete on deleteWorkflowEffect', () => {
      service.delete.mockReturnValueOnce(of(true))

      const workflow: Workflow = {
        id: '1',
        name: 'foo',
        group: { id: '2', type: WorkflowType.group, children: [], level: 0 },
        maxDepth: 2,
      }
      spectator.service.deleteWorkflowEffect(workflow)

      expect(service.delete).toHaveBeenCalledWith(workflow.id)
      expect(service.items).toHaveBeenCalled()
    })
  })
})

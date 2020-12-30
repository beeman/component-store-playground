import { Todo, TodosService } from '@component-store-playground/playground/todos/data-access'
import { ApiResponse } from '@component-store-playground/shared/util/rx'
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator/jest'
import { of, ReplaySubject } from 'rxjs'
import { TodosStore } from './todos.store'

describe('TodosStore', () => {
  let spectator: SpectatorService<TodosStore>
  let vm$: typeof TodosStore.prototype['vm$']

  const getVm = (
    partial: Partial<{
      filteredTodos: Todo[]
      error: string
      saving: boolean
      isLoading: boolean
      isEmpty: boolean
      filter: string | undefined
    }> = {},
  ) => ({
    filteredTodos: [],
    error: '',
    saving: false,
    isLoading: false,
    isEmpty: false,
    filter: undefined,
    ...partial,
  })
  const createService = createServiceFactory({
    service: TodosStore,
    mocks: [TodosService],
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

  describe('updaters', () => {
    it('should updateTodos properly', () => {
      const observerSpy = subscribeSpyTo(vm$)
      spectator.service.updateTodos({ data: [{ id: '123', done: false, task: 'foo' }], error: '', status: 'success' })
      expect(observerSpy.getValues()).toEqual([
        getVm(),
        getVm({ filteredTodos: [{ id: '123', done: false, task: 'foo' }] }),
      ])

      spectator.service.updateTodos({ data: [], error: '', status: 'success' })
      expect(observerSpy.getLastValue()).toEqual(getVm({ isEmpty: true }))

      spectator.service.updateTodos({ data: [], error: 'error', status: 'failure' })
      expect(observerSpy.getLastValue()).toEqual(getVm({ error: 'error' }))

      spectator.service.updateTodos({ data: [], error: '', status: 'loading' })
      expect(observerSpy.getLastValue()).toEqual(getVm({ isLoading: true }))
    })

    describe('updateFilter', () => {
      const $query = new ReplaySubject<string>(1)

      it('should updateFilter properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        spectator.service.updateFilter('foo')
        expect(observerSpy.getValues()).toEqual([getVm(), getVm({ filter: 'foo' })])
      })

      it('should updateFilter properly with stream', () => {
        spectator.service.updateFilter($query)
        const observerSpy = subscribeSpyTo(vm$)

        $query.next('foo')
        expect(observerSpy.getLastValue()).toEqual(getVm({ filter: 'foo' }))

        $query.next('bar')
        expect(observerSpy.getLastValue()).toEqual(getVm({ filter: 'bar' }))
      })
    })

    it('should updateSaving properly', () => {
      const observerSpy = subscribeSpyTo(vm$)
      spectator.service.updateSaving(true)
      expect(observerSpy.getValues()).toEqual([getVm(), getVm({ saving: true })])

      spectator.service.updateSaving(false)
      expect(observerSpy.getLastValue()).toEqual(getVm())
    })
  })

  describe('effects', () => {
    let service: SpyObject<TodosService>
    const getMockedServiceItemsReturn = (prev: Todo[] = []) =>
      of<ApiResponse<Todo[]>>(
        {
          data: prev,
          status: 'loading',
          error: '',
        },
        {
          data: [
            {
              task: 'foo',
              done: false,
              id: '123',
            },
          ],
          status: 'success',
          error: '',
        },
      )
    beforeEach(() => {
      service = spectator.inject(TodosService)
    })

    describe('loadTodosEffect', () => {
      it('should call service.items properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        service.items.mockReturnValueOnce(getMockedServiceItemsReturn())

        spectator.service.loadTodosEffect()

        expect(service.items).toHaveBeenCalledWith([])
        expect(observerSpy.getValues()).toEqual([
          getVm(),
          getVm({ isLoading: true }),
          getVm({
            filteredTodos: [
              {
                task: 'foo',
                done: false,
                id: '123',
              },
            ],
          }),
        ])
      })

      it('should call service.items with previous todos$', () => {
        // manually set todos response
        const prevData = [{ task: 'prev', id: '234', done: false }]
        spectator.service.patchState({ todos: { data: prevData, status: 'success', error: '' } })

        service.items.mockReturnValueOnce(getMockedServiceItemsReturn(prevData))

        const observerSpy = subscribeSpyTo(vm$)
        spectator.service.loadTodosEffect()
        expect(service.items).toHaveBeenCalledWith(prevData)
        expect(observerSpy.getValues()).toEqual([
          getVm({ filteredTodos: prevData }), // after patch
          getVm({ filteredTodos: prevData }), // service.items returning loading state with toApiResponse
          getVm({
            filteredTodos: [
              {
                task: 'foo',
                done: false,
                id: '123',
              },
            ],
          }),
        ])
      })
    })

    describe('addTodoEffect', () => {
      it('should call service.create properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        service.items.mockReturnValueOnce(getMockedServiceItemsReturn())
        service.create.mockReturnValueOnce(of({ task: 'new todo', id: '234', done: false }))

        spectator.service.addTodoEffect('new todo')
        expect(observerSpy.getValues()).toEqual([
          getVm(),
          getVm({ saving: true }),
          getVm({ isLoading: true }),
          getVm({
            filteredTodos: [
              {
                task: 'foo',
                done: false,
                id: '123',
              },
            ],
          }),
        ])
        expect(service.create).toHaveBeenCalledWith({ task: 'new todo', done: false })
        expect(service.items).toHaveBeenCalled()
      })
    })

    describe('deleteTodoEffect', () => {
      it('should call service.delete properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        service.delete.mockReturnValueOnce(of(true))

        spectator.service.deleteTodoEffect({ id: '123', task: 'foo', done: false })
        expect(observerSpy.receivedNext()).toEqual(true)
        expect(service.delete).toHaveBeenCalledWith('123')
        expect(service.items).toHaveBeenCalled()
      })
    })

    describe('toggleTodoEffect', () => {
      it('should call service.toggleTodo properly', () => {
        const observerSpy = subscribeSpyTo(vm$)
        service.toggleTodo.mockReturnValueOnce(of({ id: '123', task: 'foo', done: false }))

        spectator.service.toggleTodoEffect({ id: '123', task: 'foo', done: false })
        expect(observerSpy.receivedNext()).toEqual(true)
        expect(service.toggleTodo).toHaveBeenCalledWith({ id: '123', task: 'foo', done: false })
        expect(service.items).toHaveBeenCalled()
      })
    })
  })
})

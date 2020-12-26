import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { of, throwError } from 'rxjs'
import { RxUtil } from './rx.util'

describe('playgroundSharedUtilsRx', () => {
  describe('toApiResponse', () => {
    const foo$ = of('foo')
    const error$ = throwError('error')
    const loadingResponseFactory = (data: unknown = null) => ({
      status: 'loading',
      data,
      error: '',
    })

    it('should stream correctly', () => {
      const $ = foo$.pipe(RxUtil.toApiResponse())
      const observerSpy = subscribeSpyTo($)
      expect(observerSpy.getValues()).toEqual([loadingResponseFactory(), { status: 'success', data: 'foo', error: '' }])
    })

    it('should return error if sourceObs throws and rethrow is false', () => {
      const $ = error$.pipe(RxUtil.toApiResponse())
      const observerSpy = subscribeSpyTo($)
      expect(observerSpy.getValues()).toEqual([
        loadingResponseFactory(),
        { status: 'failure', data: null, error: 'error' },
      ])
    })

    it('should rethrow error if sourceObs throws and rethrow is true', () => {
      const $ = error$.pipe(RxUtil.toApiResponse(null, true))
      const observerSpy = subscribeSpyTo($, { expectErrors: true })
      expect(observerSpy.getValues()).toEqual([loadingResponseFactory()])
      expect(observerSpy.getError()).toEqual('error')
    })

    it('should return error if sourceObs throws and errFactory is passed in', () => {
      const $ = error$.pipe(RxUtil.toApiResponse(null, (err) => err + ' foo'))
      const observerSpy = subscribeSpyTo($)
      expect(observerSpy.getValues()).toEqual([
        loadingResponseFactory(),
        { status: 'failure', data: null, error: 'error foo' },
      ])
    })

    it('should return error if sourceObs throws and errObsFactory is passed in', () => {
      const $ = error$.pipe(RxUtil.toApiResponse(null, (err) => of(err + ' foo')))
      const observerSpy = subscribeSpyTo($)
      expect(observerSpy.getValues()).toEqual([
        loadingResponseFactory(),
        { status: 'failure', data: null, error: 'error foo' },
      ])
    })
  })

  describe('log', () => {
    it('should call log with context and data', () => {
      const spiedConsole = spyOn(console, 'log')
      const $ = of('foo').pipe(RxUtil.log('test'))
      subscribeSpyTo($)
      expect(spiedConsole).toHaveBeenCalledWith('test', 'foo')
    })

    it('should call log with data', () => {
      const spiedConsole = spyOn(console, 'log')
      const $ = of('foo').pipe(RxUtil.log())
      subscribeSpyTo($)
      expect(spiedConsole).toHaveBeenCalledWith({ data: 'foo' })
    })
  })
})

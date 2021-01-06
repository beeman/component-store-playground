import { Directive } from '@angular/core'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { isObservable, Observable, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ReduxDevtoolsExtensionConnection } from './interfaces'

@Directive()
export class ReduxComponentStore<TState extends object> extends ImmerComponentStore<TState> {
  private devToolsConnection?: ReduxDevtoolsExtensionConnection
  private readonly isExtensionPresent?: boolean
  private readonly storeName = this.constructor.name

  constructor(
    defaultState?: TState,
    isExtensionPresent?: boolean,
    devToolsConnection?: ReduxDevtoolsExtensionConnection,
  ) {
    super(defaultState)
    this.isExtensionPresent = isExtensionPresent
    if (isExtensionPresent) {
      this.devToolsConnection = devToolsConnection
      this.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
        this.devToolsConnection?.send(`[${this.storeName}] setState`, state)
      })
    }
  }

  updater<
    ProvidedType = void,
    OriginType = ProvidedType,
    ValueType = OriginType,
    ReturnType = OriginType extends void
      ? () => void
      : (observableOrValue: Observable<ValueType> | ValueType) => Subscription
  >(updaterFn: (state: TState, value: OriginType) => void | TState): ReturnType {
    const fn = super.updater(updaterFn)

    if (this.isExtensionPresent) {
      const temp = (args: Observable<ValueType> | ValueType) => {
        const errorStack = new Error().stack

        if (errorStack?.includes('.setState') || errorStack?.includes('.patchState')) {
          return ((fn as unknown) as Function)(args)
        }

        const callerName = errorStack?.match(/\[as (\w+)]/)?.[1]

        if (isObservable(args)) {
          args.pipe(takeUntil(this.destroy$)).subscribe((payload: ValueType) => {
            this.devToolsConnection?.send({ type: `[${this.constructor.name}] ${callerName}`, payload }, this.get())
          })
        } else {
          this.devToolsConnection?.send({ type: `[${this.constructor.name}] ${callerName}`, payload: args }, this.get())
        }

        return ((fn as unknown) as Function)(args)
      }

      return (temp as unknown) as ReturnType
    }

    return (fn as unknown) as ReturnType
  }

  effect<
    ProvidedType = void,
    OriginType extends Observable<ProvidedType> | unknown = Observable<ProvidedType>,
    ObservableType = OriginType extends Observable<infer A> ? A : never,
    ReturnType = ProvidedType | ObservableType extends void
      ? () => void
      : (observableOrValue: Observable<ObservableType> | ObservableType) => Subscription
  >(generator: (origin$: OriginType) => Observable<unknown>): ReturnType {
    const fn = super.effect(generator)

    if (this.isExtensionPresent) {
      const temp = (args: ObservableType | Observable<ObservableType>) => {
        const errorStack = new Error().stack

        if (errorStack?.includes('.setState') || errorStack?.includes('.patchState')) {
          return ((fn as unknown) as Function)(args)
        }

        const callerName = errorStack?.match(/\[as (\w+)]/)?.[1]

        if (isObservable(args)) {
          args.pipe(takeUntil(this.destroy$)).subscribe((payload: ObservableType) => {
            this.devToolsConnection?.send({ type: `[${this.constructor.name}] ${callerName}`, payload }, this.get())
          })
        } else {
          this.devToolsConnection?.send({ type: `[${this.constructor.name}] ${callerName}`, payload: args }, this.get())
        }

        return ((fn as unknown) as Function)(args)
      }

      return (temp as unknown) as ReturnType
    }

    return (fn as unknown) as ReturnType
  }

  ngOnDestroy() {
    super.ngOnDestroy()
    this.devToolsConnection?.unsubscribe()
  }
}

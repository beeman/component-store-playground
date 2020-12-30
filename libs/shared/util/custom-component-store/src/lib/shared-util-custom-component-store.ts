import { Directive } from '@angular/core'
import { ImmerComponentStore } from 'ngrx-immer/component-store'

@Directive()
export abstract class CustomComponentStore<TState extends object> extends ImmerComponentStore<TState> {
  // private runHooks$ = new BehaviorSubject<boolean>(false)
  // private readonly beforeHook: (val) => void
  // private readonly afterHook: (val) => void

  protected $ = this.select((state) => state)

  // protected constructor(options?: {
  //   initialState?: TState
  //   hooks?: {
  //     before?: (val) => void
  //     after?: (val) => void
  //   }
  // }) {
  //   super(options?.initialState)
  //   this.beforeHook = options?.hooks?.before
  //   this.afterHook = options?.hooks?.after
  // }

  // effect<ProvidedType = void,
  //   OriginType extends Observable<ProvidedType> | unknown = Observable<ProvidedType>,
  //   ObservableType = OriginType extends Observable<infer A> ? A : never,
  //   ReturnType = ProvidedType | ObservableType extends void
  //     ? () => void
  //     : (observableOrValue: Observable<ObservableType> | ObservableType, runHooks?: boolean) => Subscription>(generator: (origin$: OriginType) => Observable<unknown>): ReturnType {
  //   const origin$ = new Subject<ObservableType>()
  //
  //   this.runHooks$
  //     .pipe(
  //       switchMap((runHooks) => {
  //         const original$ = generator(origin$.asObservable() as OriginType).pipe(takeUntil(this.destroy$))
  //         return runHooks
  //           ? original$.pipe(
  //             withLatestFrom(this.$),
  //             tap((data) => this.beforeHook?.({ data: data[0], state: data[1] })),
  //             map(([data]) => data),
  //           )
  //           : original$
  //       }),
  //     )
  //     .subscribe()
  //
  //   // generator(origin$.asObservable() as OriginType)
  //   //   // tied to the lifecycle 👇 of ComponentStore
  //   //   .pipe(takeUntil(this.destroy$))
  //   //   .subscribe()
  //
  //   return (((
  //     observableOrValue?: ObservableType | Observable<ObservableType>,
  //     runHooks: boolean = false,
  //   ): Subscription => {
  //     if (runHooks !== this.runHooks$.getValue()) {
  //       this.runHooks$.next(runHooks)
  //     }
  //
  //     const observable$ = isObservable(observableOrValue) ? observableOrValue : of(observableOrValue)
  //
  //     let obs$ = runHooks
  //       ? observable$.pipe(
  //         withLatestFrom(this.$),
  //         tap((data) => this.beforeHook?.({ data: data[0], state: data[1] })),
  //         map(([data]) => data),
  //       )
  //       : observable$
  //
  //     return obs$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
  //       // any new 👇 value is pushed into a stream
  //       origin$.next(value)
  //     })
  //   }) as unknown) as ReturnType
  // }
}

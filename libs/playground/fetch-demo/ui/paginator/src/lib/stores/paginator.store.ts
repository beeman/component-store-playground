import { Injectable } from '@angular/core'
import { PaginatorState } from '@component-store-playground/playground/fetch-demo/ui/paginator'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { Subject } from 'rxjs'
import { tap, withLatestFrom } from 'rxjs/operators'

interface PaginatorStoreState {
  totalRecords: number
  rows: number
  first: number
  rowsPerPage: number
}

@Injectable()
export class PaginatorStore extends ImmerComponentStore<PaginatorStoreState> {
  private readonly $pageChanged = new Subject<Omit<PaginatorState, 'totalRecords'>>()
  pageChanged$ = this.$pageChanged.asObservable()

  readonly totalRecords$ = this.select((s) => s.totalRecords)
  readonly rows$ = this.select((s) => s.rows)
  readonly first$ = this.select((s) => s.first)

  readonly pageCount$ = this.select(this.totalRecords$, this.rows$, (totalRecords, rows) =>
    Math.ceil(totalRecords / rows),
  )

  readonly page$ = this.select(this.rows$, this.first$, (rows, first) => {
    const dummy = Math.floor(first / rows)
    return dummy === 0 ? dummy + 1 : dummy
  })

  readonly pageLinks$ = this.select(this.pageCount$, this.page$, (pageCount, page) => {
    const visiblePages = Math.min(5, pageCount)

    //calculate range, keep current in middle if necessary
    let start = Math.max(0, Math.floor(page - visiblePages / 2))
    const end = Math.min(pageCount - 1, start + visiblePages - 1)

    //check when approaching to last page
    const delta = () => end - start + 1
    start = Math.max(0, start - (5 - delta()))

    return delta() < 0
      ? []
      : Array(delta())
          .fill(undefined)
          .map((_, ind) => ind + start + 1)
  })

  readonly vm$ = this.select(
    this.page$,
    this.pageCount$,
    this.pageLinks$,
    this.rows$,
    (page, pageCount, pageLinks, rows) => ({
      currentPage: page,
      isLastPage: page === pageCount,
      isFirstPage: page === 1,
      pageLinks,
      rows,
    }),
    { debounce: true },
  )

  constructor() {
    super({ rows: 20, totalRecords: 0, first: 1, rowsPerPage: 20 })
  }

  readonly updateRows = this.updater<number>((state, value) => {
    state.rows = value
  })

  readonly updateTotalRecords = this.updater<number>((state, value) => {
    state.totalRecords = value
  })

  readonly changePageEffect = this.effect<number>((newPage$) =>
    newPage$.pipe(
      withLatestFrom(this.pageCount$, this.rows$),
      tap(([newPage, pageCount, rows]) => {
        if (newPage >= 0 && newPage <= pageCount) {
          const first = rows * newPage
          this.patchState({ first })
          this.$pageChanged.next({
            page: newPage,
            first,
            rows,
            pageCount,
          })
        }
      }),
    ),
  )

  readonly nextPageEffect = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.page$),
      tap(([, page]) => {
        this.changePageEffect(page + 1)
      }),
    ),
  )

  readonly prevPageEffect = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.page$),
      tap(([, page]) => {
        this.changePageEffect(page - 1)
      }),
    ),
  )

  readonly firstPageEffect = this.changePageEffect.bind(this, 1)

  readonly lastPageEffect = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.pageCount$),
      tap(([, pageCount]) => {
        this.changePageEffect(pageCount)
      }),
    ),
  )

  readonly rowsPerPageChangeEffect = this.effect<number>((rowsPerPage$) =>
    rowsPerPage$.pipe(
      tap((rowsPerPage) => {
        this.patchState({
          rows: rowsPerPage,
        })
        this.changePageEffect(1)
      }),
    ),
  )
}

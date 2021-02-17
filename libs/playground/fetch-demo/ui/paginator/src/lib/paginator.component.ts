import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import type { Observable } from 'rxjs'
import { PaginatorStore } from './stores'

interface PaginatorVm {
  currentPage: number
  isLastPage: boolean
  isFirstPage: boolean
  pageLinks: number[]
}

@Component({
  selector: 'playground-paginator',
  templateUrl: './paginator.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginatorStore],
})
export class PaginatorComponent {
  @Input() set totalRecords(total: number) {
    this.paginatorStore.updateTotalRecords(total)
  }

  @Input() set rows(rows: number) {
    this.paginatorStore.updateRows(rows)
  }

  // TODO(chau): implement rowsPerPageOptions
  // @Input() rowsPerPageOptions: number[] = []

  @Output() pageChange = this.paginatorStore.pageChanged$

  vm$: Observable<PaginatorVm> = this.paginatorStore.vm$

  constructor(private readonly paginatorStore: PaginatorStore) {}

  changePage(page: number) {
    this.paginatorStore.changePageEffect(page)
  }

  prevPage(event: MouseEvent) {
    this.paginatorStore.prevPageEffect()
    event.preventDefault?.()
  }

  nextPage(event: MouseEvent) {
    this.paginatorStore.nextPageEffect()
    event.preventDefault?.()
  }

  firstPage(event: MouseEvent) {
    this.paginatorStore.firstPageEffect()
    event.preventDefault?.()
  }

  lastPage(event: MouseEvent) {
    this.paginatorStore.lastPageEffect()
    event.preventDefault?.()
  }

  onPageLinkClick(event: MouseEvent, page: number) {
    this.changePage(page)
    event.preventDefault?.()
  }
}

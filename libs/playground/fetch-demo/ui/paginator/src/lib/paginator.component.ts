import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { PaginatorStore } from './stores'

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

  // TODO(chau): implement rowsPerPageOptions
  @Input() rowsPerPageOptions: number[] = []

  @Output() pageChange = this.paginatorStore.pageChanged$

  vm$ = this.paginatorStore.vm$.pipe(
    tap(({ rows }) => {
      this.rowsPerPageControl.setValue(rows.toString(), { emitEvent: false })
    }),
  )

  rowsPerPageControl = new FormControl()

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

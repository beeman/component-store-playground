import { ChangeDetectionStrategy, Component, HostBinding, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { map, tap } from 'rxjs/operators'
import { PaginatorStore } from './stores'

@Component({
  selector: 'playground-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginatorStore],
})
export class PaginatorComponent {
  @Input() set totalRecords(total: number) {
    this.paginatorStore.updateTotalRecords(total)
  }

  @Input() rowsPerPageOptions: number[] = []

  @Output() pageChange = this.paginatorStore.pageChanged$

  @HostBinding('class') hostClass = 'inline-flex text-gray-700 dark:text-white items-center'

  vm$ = this.paginatorStore.vm$.pipe(
    tap(({ rows }) => {
      this.rowsPerPageControl.setValue(rows.toString(), { emitEvent: false })
    }),
  )

  rowsPerPageControl = new FormControl()

  constructor(private readonly paginatorStore: PaginatorStore) {
    paginatorStore.rowsPerPageChangeEffect(this.rowsPerPageControl.valueChanges.pipe(map(Number)))
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
    this.paginatorStore.changePageEffect(page)
    event.preventDefault?.()
  }
}

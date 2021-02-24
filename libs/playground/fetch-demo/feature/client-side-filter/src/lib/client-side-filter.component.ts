import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import type { PaginatorState } from '@component-store-playground/playground/fetch-demo/ui/paginator'
import { debounceTime } from 'rxjs/operators'
import { PokemonClientSideFilterStore } from './stores'

@Component({
  selector: 'playground-client-side-filter',
  templateUrl: './client-side-filter.component.html',
  styleUrls: ['./client-side-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokemonClientSideFilterStore],
})
export class ClientSideFilterComponent {
  readonly vm$ = this.pokemonClientSideFilterStore.vm$

  queryControl = new FormControl('')

  constructor(private readonly pokemonClientSideFilterStore: PokemonClientSideFilterStore) {
    pokemonClientSideFilterStore.updateQuery(this.queryControl.valueChanges.pipe(debounceTime(250)))
  }

  onPageChange({ rows, first }: Omit<PaginatorState, 'totalRecords'>) {
    this.pokemonClientSideFilterStore.updatePagination({
      limit: rows,
      offset: first - rows,
    })

    this.queryControl.setValue('')
  }

  onPokemonClick(id?: string) {
    if (id) {
      this.pokemonClientSideFilterStore.goToDetail(id)
    }
  }
}

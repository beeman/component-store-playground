import { Injectable } from '@angular/core'
import type { Pokemon } from '@component-store-playground/playground/fetch-demo/data-access'
import { PokemonService } from '@component-store-playground/playground/fetch-demo/data-access'
import type { ApiResponseStatus } from '@component-store-playground/shared/util/rx'
import { tapResponse } from '@ngrx/component-store'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { combineLatest } from 'rxjs'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

interface UpdatePaginationParams {
  limit: number
  offset: number
}

export interface PokemonClientSideFilterState extends UpdatePaginationParams {
  status: ApiResponseStatus
  originalPokemons: Pokemon[]
  filteredPokemons: Pokemon[]
  total: number
  query: string
}

@Injectable()
export class PokemonClientSideFilterStore extends ImmerComponentStore<PokemonClientSideFilterState> {
  readonly vm$ = this.select(
    this.state$,
    ({ status, filteredPokemons, total, limit }) => ({
      pokemons: filteredPokemons as Pokemon[],
      isLoading: status === 'loading',
      isIdle: status === 'idle',
      total,
      limit,
    }),
    { debounce: true },
  )

  constructor(private readonly pokemonService: PokemonService) {
    super({
      status: 'idle',
      filteredPokemons: [],
      originalPokemons: [],
      total: 0,
      limit: 20,
      offset: 0,
      query: '',
    })

    this.fetchPokemonEffect(combineLatest([this.select((state) => state.limit), this.select((state) => state.offset)]))
    this.filterEffect(this.select((state) => state.query))
  }

  readonly updateQuery = this.updater<string>((state, value) => {
    state.query = value
  })

  readonly updatePagination = this.updater<UpdatePaginationParams>((state, { limit, offset }) => {
    state.limit = limit
    state.offset = offset
  })

  readonly fetchPokemonEffect = this.effect<[number, number]>((limitAndOffset$) =>
    limitAndOffset$.pipe(
      withLatestFrom(this.state$.pipe(map(({ originalPokemons, total }) => ({ originalPokemons, total })))),
      switchMap(([[limit, offset], { total, originalPokemons }]) =>
        this.pokemonService
          .getPokemon(limit, offset, {
            count: total,
            results: originalPokemons,
            next: '',
            previous: '',
          })
          .pipe(
            tapResponse((response) => {
              this.patchState({
                status: response.status,
                total: response.data!.count,
                filteredPokemons: response.data!.results,
                originalPokemons: response.data!.results,
              })
            }, console.error),
          ),
      ),
    ),
  )

  readonly filterEffect = this.effect<string>((query$) =>
    query$.pipe(
      withLatestFrom(this.select((state) => state.originalPokemons)),
      tap(([query, originalPokemons]) => {
        if (query) {
          this.patchState({
            filteredPokemons: originalPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(query.toLowerCase()),
            ),
          })
        }
      }),
    ),
  )
}

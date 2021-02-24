import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import type { PokemonDetail, SimplifiedPokemon } from '@component-store-playground/playground/fetch-demo/data-access'
import { PokemonService } from '@component-store-playground/playground/fetch-demo/data-access'
import { ApiResponseStatus } from '@component-store-playground/shared/util/rx'
import { tapResponse } from '@ngrx/component-store'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { pluck, switchMap, withLatestFrom } from 'rxjs/operators'

interface PokemonDetailState {
  pokemonId: number
  pokemon: PokemonDetail | null
  status: ApiResponseStatus
}

@Injectable()
export class PokemonDetailStore extends ImmerComponentStore<PokemonDetailState> {
  readonly pokemon$ = this.select((s) => s.pokemon)
  readonly pokemonId$ = this.select((s) => s.pokemonId)
  readonly status$ = this.select((s) => s.status)

  readonly vm$ = this.select(
    this.pokemon$,
    this.status$,
    (pokemon, status) => ({
      isLoading: status === 'loading',
      pokemon,
      simplifiedPokemon: PokemonDetailStore.getSimplifiedPokemon(pokemon),
    }),
    { debounce: true },
  )

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokemonService: PokemonService,
    private readonly router: Router,
  ) {
    super({ pokemonId: 0, pokemon: null, status: 'idle' })
    this.loadPokemonDetailEffect(route.params.pipe(pluck('id')))
  }

  readonly loadPokemonDetailEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) => {
        this.patchState({ pokemonId: Number(id) })
        return this.pokemonService.getPokemonDetail(id).pipe(
          tapResponse(({ data, status }) => {
            this.patchState({ pokemon: data, status })
          }, console.error),
        )
      }),
    ),
  )

  readonly nextIdEffect = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.pokemonId$),
      switchMap(([, id]) => this.router.navigate(['/fetch', id + 1])),
    ),
  )

  readonly prevIdEffect = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.pokemonId$),
      switchMap(([, id]) => this.router.navigate(['/fetch', id - 1])),
    ),
  )

  private static getSimplifiedPokemon(pokemon: PokemonDetail | null): SimplifiedPokemon {
    return {
      name: pokemon?.name || '',
      ability: pokemon?.abilities?.find((ability) => !ability.is_hidden)?.ability?.name || '',
      hiddenAbility: pokemon?.abilities?.find((ability) => ability.is_hidden)?.ability?.name || '',
      image: pokemon?.sprites?.other?.['official-artwork']?.front_default || '',
      stats: pokemon?.stats || [],
      type: pokemon?.types[0].type?.name || '',
    }
  }
}

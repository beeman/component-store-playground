import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { ApiResponse } from '@component-store-playground/shared/util/rx'
import { RxUtil } from '@component-store-playground/shared/util/rx'
import type { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import type { PaginatedPokemon, PokemonDetail } from '../models'

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon'
  constructor(private readonly httpClient: HttpClient) {}

  getPokemon(limit: number, offset: number, prev: PaginatedPokemon): Observable<ApiResponse<PaginatedPokemon>> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
    }

    return this.httpClient
      .get<PaginatedPokemon>(this.baseUrl, { params })
      .pipe(
        delay(1500),
        map((paginatedPokemon) => {
          return {
            ...paginatedPokemon,
            results: paginatedPokemon.results.map((pokemon) => ({
              ...pokemon,
              id: pokemon.url.split('/').filter(Boolean).pop(),
            })),
          }
        }),
        RxUtil.toApiResponse(prev),
      )
  }

  getPokemonDetail(id: string): Observable<ApiResponse<PokemonDetail>> {
    return this.httpClient
      .get<PokemonDetail>(`${this.baseUrl}/${id}`)
      .pipe(delay(1500), RxUtil.toApiResponse<PokemonDetail>(undefined))
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { ApiResponse } from '@component-store-playground/shared/util/rx'
import { RxUtil } from '@component-store-playground/shared/util/rx'
import type { Observable } from 'rxjs'
import { delay } from 'rxjs/operators'
import type { PaginatedPokemon } from '../models'

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private readonly httpClient: HttpClient) {}

  getPokemon(limit: number, offset: number, prev: PaginatedPokemon): Observable<ApiResponse<PaginatedPokemon>> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
    }

    return this.httpClient
      .get<PaginatedPokemon>('https://pokeapi.co/api/v2/pokemon', { params })
      .pipe(delay(1500), RxUtil.toApiResponse(prev))
  }
}

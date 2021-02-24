import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'

import { FetchDemoDetailComponent } from './fetch-demo-detail.component'
import { PokemonDetailStore } from './stores'

describe('FetchDemoDetailComponent', () => {
  let spectator: Spectator<FetchDemoDetailComponent>
  let mockedPokemonDetailStore: SpyObject<PokemonDetailStore>

  const createComponent = createComponentFactory({
    component: FetchDemoDetailComponent,
    providers: [mockProvider(PokemonDetailStore)],
    imports: [RouterTestingModule, HttpClientTestingModule],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
    mockedPokemonDetailStore = spectator.inject(PokemonDetailStore, true)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'

import { ClientSideFilterComponent } from './client-side-filter.component'
import { PokemonClientSideFilterStore } from './stores'

describe('ClientSideFilterComponent', () => {
  let spectator: Spectator<ClientSideFilterComponent>
  let mockedPokemonClientSideStore: SpyObject<PokemonClientSideFilterStore>

  const createComponent = createComponentFactory({
    component: ClientSideFilterComponent,
    providers: [mockProvider(PokemonClientSideFilterStore)],
    imports: [RouterTestingModule, HttpClientTestingModule],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

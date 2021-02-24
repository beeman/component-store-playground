import { SimplifiedPokemon } from '@component-store-playground/playground/fetch-demo/data-access'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { PokemonCardComponent } from './pokemon-card.component'

function getPokemon(): SimplifiedPokemon {
  return {
    name: '',
    hiddenAbility: '',
    ability: '',
    stats: [],
    type: '',
    image: '',
  }
}

describe('PokemonCardComponent', () => {
  let spectator: Spectator<PokemonCardComponent>

  const createComponent = createComponentFactory({
    component: PokemonCardComponent,
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent({ props: { pokemon: getPokemon() } })
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

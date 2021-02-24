import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PokemonCardComponent } from './pokemon-card.component'

@NgModule({
  imports: [CommonModule],
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent],
})
export class PlaygroundFetchDemoUiPokemonCardModule {}

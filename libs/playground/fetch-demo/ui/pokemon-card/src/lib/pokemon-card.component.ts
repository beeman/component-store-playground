import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SimplifiedPokemon } from '@component-store-playground/playground/fetch-demo/data-access'

@Component({
  selector: 'playground-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input() pokemon!: SimplifiedPokemon

  pokemonTypeColorMap: Record<
    string,
    {
      outer: string[]
      innerHeader: string[]
      innerFooter: string[]
      type: string[]
    }
  > = {
    normal: {
      outer: ['from-yellow-400', 'to-purple-400'],
      innerHeader: ['from-yellow-600', 'to-purple-600'],
      innerFooter: ['from-yellow-200', 'to-purple-200'],
      type: ['bg-yellow-600', 'text-white'],
    },
    fire: {
      outer: ['from-amber-400', 'to-red-400'],
      innerHeader: ['from-amber-600', 'to-red-600'],
      innerFooter: ['from-amber-100', 'to-red-300'],
      type: ['bg-red-500', 'text-white'],
    },
    water: {
      outer: ['from-lightBlue-400', 'to-cyan-600'],
      innerHeader: ['from-lightBlue-600', 'to-cyan-800'],
      innerFooter: ['from-lightBlue-100', 'to-cyan-300'],
      type: ['bg-lightBlue-500', 'text-white'],
    },
    electric: {
      outer: ['from-yellow-300', 'to-lime-300'],
      innerHeader: ['from-yellow-500', 'to-lime-500'],
      innerFooter: ['from-yellow-200', 'to-lime-200'],
      type: ['bg-yellow-500', 'text-white'],
    },
    grass: {
      outer: ['from-lime-200', 'to-lime-400'],
      innerHeader: ['from-lime-500', 'to-lime-700'],
      innerFooter: ['from-lime-100', 'to-lime-300'],
      type: ['bg-lime-500', 'text-white'],
    },
    psychic: {
      outer: ['from-pink-300', 'to-rose-300'],
      innerHeader: ['from-pink-500', 'to-rose-500'],
      innerFooter: ['from-pink-200', 'to-rose-200'],
      type: ['bg-pink-500', 'text-white'],
    },
    dark: {
      outer: ['from-fuchsia-700', 'to-gray-700'],
      innerHeader: ['from-fuchsia-900', 'to-gray-900'],
      innerFooter: ['from-fuchsia-100', 'to-gray-100'],
      type: ['bg-fuchsia-600', 'text-white'],
    },
    fairy: {
      outer: ['from-rose-200', 'to-rose-400'],
      innerHeader: ['from-rose-600', 'to-rose-800'],
      innerFooter: ['from-rose-100', 'to-rose-300'],
      type: ['bg-rose-500', 'text-white'],
    },
    ice: {
      outer: ['from-cyan-300', 'to-lightBlue-300'],
      innerHeader: ['from-cyan-700', 'to-lightBlue-700'],
      innerFooter: ['from-cyan-200', 'to-lightBlue-200'],
      type: ['bg-cyan-600', 'text-white'],
    },
    poison: {
      outer: ['from-green-200', 'to-green-400'],
      innerHeader: ['from-green-500', 'to-green-700'],
      innerFooter: ['from-green-100', 'to-green-300'],
      type: ['bg-green-500', 'text-white'],
    },
    rock: {
      outer: ['from-trueGray-200', 'to-blueGray-400'],
      innerHeader: ['from-trueGray-500', 'to-blueGray-700'],
      innerFooter: ['from-trueGray-100', 'to-blueGray-300'],
      type: ['bg-trueGray-500', 'text-white'],
    },
    dragon: {
      outer: ['from-indigo-200', 'to-orange-400'],
      innerHeader: ['from-indigo-500', 'to-orange-700'],
      innerFooter: ['from-indigo-100', 'to-orange-300'],
      type: ['bg-indigo-500', 'text-white'],
    },
    steel: {
      outer: ['from-warmGray-200', 'to-gray-400'],
      innerHeader: ['from-warmGray-500', 'to-gray-700'],
      innerFooter: ['from-warmGray-100', 'to-gray-300'],
      type: ['bg-warmGray-500', 'text-white'],
    },
    bug: {
      outer: ['from-lime-200', 'to-emerald-400'],
      innerHeader: ['from-lime-500', 'to-emerald-700'],
      innerFooter: ['from-lime-100', 'to-emerald-300'],
      type: ['bg-lime-500', 'text-white'],
    },
    ground: {
      outer: ['from-amber-200', 'to-gray-400'],
      innerHeader: ['from-amber-500', 'to-gray-700'],
      innerFooter: ['from-amber-100', 'to-gray-300'],
      type: ['bg-amber-500', 'text-white'],
    },
    fighting: {
      outer: ['from-emerald-300', 'to-violet-300'],
      innerHeader: ['from-emerald-700', 'to-violet-700'],
      innerFooter: ['from-emerald-200', 'to-violet-200'],
      type: ['bg-emerald-600', 'text-white'],
    },
    ghost: {
      outer: ['from-cyan-300', 'to-amber-300'],
      innerHeader: ['from-cyan-700', 'to-amber-700'],
      innerFooter: ['from-cyan-200', 'to-amber-200'],
      type: ['bg-cyan-600', 'text-white'],
    },
    flying: {
      outer: ['from-teal-300', 'to-rose-300'],
      innerHeader: ['from-teal-700', 'to-rose-700'],
      innerFooter: ['from-teal-200', 'to-rose-200'],
      type: ['bg-teal-600', 'text-white'],
    },
  }
}

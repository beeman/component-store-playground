export interface PaginatedPokemon {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}

export interface Pokemon {
  name: string
  url: string
  id?: string
}

export interface SimplifiedPokemon {
  name: string
  ability: string
  hiddenAbility: string
  image: string
  stats: Stat[]
  type: string
}

export interface PokemonDetail {
  abilities: Ability[]
  base_experience: number
  forms: Species[]
  game_indices: GameIndex[]
  height: number
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export interface Ability {
  ability: Species
  is_hidden: boolean
  slot: number
}

export interface Species {
  name: string
  url: string
}

export interface GameIndex {
  game_index: number
  version: Species
}

export interface Move {
  move: Species
  version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: Species
  version_group: Species
}

export interface GenerationV {
  'black-white': Sprites
}

export interface GenerationIv {
  'diamond-pearl': Sprites
  'heartgold-soulsilver': Sprites
  platinum: Sprites
}

export interface Versions {
  'generation-i': GenerationI
  'generation-ii': GenerationIi
  'generation-iii': GenerationIii
  'generation-iv': GenerationIv
  'generation-v': GenerationV
  'generation-vi': { [key: string]: GenerationVi }
  'generation-vii': GenerationVii
  'generation-viii': GenerationViii
}

export interface Sprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other?: Other
  versions?: Versions
  animated?: Sprites
}

export interface GenerationI {
  'red-blue': RedBlue
  yellow: RedBlue
}

export interface RedBlue {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

export interface GenerationIi {
  crystal: Crystal
  gold: Crystal
  silver: Crystal
}

export interface Crystal {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface GenerationIii {
  emerald: Emerald
  'firered-leafgreen': Crystal
  'ruby-sapphire': Crystal
}

export interface Emerald {
  front_default: string
  front_shiny: string
}

export interface GenerationVi {
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}

export interface GenerationVii {
  icons: DreamWorld
  'ultra-sun-ultra-moon': GenerationVi
}

export interface DreamWorld {
  front_default: string | null
  front_female: string | null
}

export interface GenerationViii {
  icons: DreamWorld
}

export interface Other {
  dream_world: DreamWorld
  'official-artwork': OfficialArtwork
}

export interface OfficialArtwork {
  front_default: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Species
}

export interface Type {
  slot: number
  type: Species
}

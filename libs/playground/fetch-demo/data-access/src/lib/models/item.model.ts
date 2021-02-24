export interface ItemDetail {
  attributes: Category[]
  baby_trigger_for: null
  category: Category
  cost: number
  effect_entries: EffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
  game_indices: GameIndex[]
  id: number
  name: string
  names: Name[]
  sprites: Sprites
}

export interface Category {
  name: string
  url: string
}

export interface EffectEntry {
  effect: string
  language: Category
  short_effect: string
}

export interface FlavorTextEntry {
  language: Category
  text: string
  version_group: Category
}

export interface GameIndex {
  game_index: number
  generation: Category
}

export interface Name {
  language: Category
  name: string
}

export interface Sprites {
  default: string
}

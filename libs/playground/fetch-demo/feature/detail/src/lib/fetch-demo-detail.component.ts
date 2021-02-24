import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit } from '@angular/core'
import { PokemonDetailStore } from './stores'

@Component({
  selector: 'playground-fetch-demo-detail',
  templateUrl: './fetch-demo-detail.component.html',
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokemonDetailStore],
})
export class FetchDemoDetailComponent implements OnInit {
  readonly vm$ = this.pokemonDetailStore.vm$

  @HostBinding('class') hostClass = 'flex gap-4 items-center justify-center'

  constructor(private readonly pokemonDetailStore: PokemonDetailStore) {}

  ngOnInit(): void {}

  nextId() {
    this.pokemonDetailStore.nextIdEffect()
  }

  prevId() {
    this.pokemonDetailStore.prevIdEffect()
  }

  @HostListener('window:keyup', ['$event.code'])
  onArrow(keyCode: string) {
    switch (keyCode) {
      case 'ArrowRight':
        this.nextId()
        break
      case 'ArrowLeft':
        this.prevId()
        break
      default:
        break
    }
  }
}

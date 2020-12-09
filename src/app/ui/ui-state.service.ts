import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { tap } from 'rxjs/operators'

type UiTheme = 'dark' | 'light'

interface UiState {
  theme: UiTheme
}

@Injectable({ providedIn: 'root' })
export class UiStateService extends ComponentStore<UiState> {
  private readonly body: HTMLElement

  constructor(@Inject(DOCUMENT) private document: Document) {
    super({ theme: 'dark' })
    this.body = this.document.body
    this.toggleThemeEffect(this.select((state) => state.theme))
  }

  readonly vm$ = this.select(({ theme }) => ({ theme }))

  readonly toggleTheme = this.updater((state) => ({
    ...state,
    theme: state.theme === 'dark' ? 'light' : 'dark',
  }))

  private readonly toggleThemeEffect = this.effect<UiTheme>((theme$) =>
    theme$.pipe(
      tap((theme) => {
        this.body.classList.remove('dark', 'light')
        this.body.classList.add(theme)
      }),
    ),
  )
}

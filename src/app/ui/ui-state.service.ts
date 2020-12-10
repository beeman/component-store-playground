import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { tap } from 'rxjs/operators'

type UiTheme = 'dark' | 'light'

interface UiState {
  theme: UiTheme
}

const LS_THEME_KEY = '@@component_store_playground/theme'

@Injectable({ providedIn: 'root' })
export class UiStateService extends ComponentStore<UiState> {
  private readonly body: HTMLElement

  constructor(@Inject(DOCUMENT) private document: Document) {
    super({ theme: 'dark' })
    this.body = this.document.body
    this.initializeEffect()
    this.toggleThemeEffect(this.select((state) => state.theme))
  }

  readonly vm$ = this.select(({ theme }) => ({ theme }))

  readonly initializeEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        const savedTheme = localStorage.getItem(LS_THEME_KEY)
        if (savedTheme) {
          this.setState({ theme: savedTheme as UiTheme })
        }
      }),
    ),
  )

  readonly toggleTheme = this.updater((state) => ({
    ...state,
    theme: state.theme === 'dark' ? 'light' : 'dark',
  }))

  private readonly toggleThemeEffect = this.effect<UiTheme>((theme$) =>
    theme$.pipe(
      tap((theme) => {
        localStorage.setItem(LS_THEME_KEY, theme)
        this.body.classList.remove('dark', 'light')
        this.body.classList.add(theme)
      }),
    ),
  )
}

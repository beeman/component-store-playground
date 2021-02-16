import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import type { NavItem } from '@component-store-playground/shared/data-access/models'
import { UiIcon } from '@component-store-playground/shared/ui/icon'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { tap } from 'rxjs/operators'

type UiTheme = 'dark' | 'light'

interface UiState {
  theme: UiTheme
  navItems: NavItem[]
}

const LS_THEME_KEY = '@@component_store_playground/theme'

@Injectable({ providedIn: 'root' })
export class UiStore extends ImmerComponentStore<UiState> {
  private readonly body: HTMLElement

  constructor(@Inject(DOCUMENT) private document: Document) {
    super({
      theme: 'dark',
      navItems: [
        { label: 'Forms', path: '/forms' },
        { label: 'Todos', path: '/todos' },
        { label: 'Workflows', path: '/workflows' },
        { label: 'Fetching', path: '/fetch' },
      ],
    })
    this.body = this.document.body
    this.initializeEffect()
    this.toggleThemeEffect(this.select((state) => state.theme))
  }

  readonly vm$ = this.select(({ theme }) => ({
    theme,
    icon: theme === 'dark' ? UiIcon.sun : UiIcon.moon,
  }))

  readonly navItems$ = this.select((s) => s.navItems)

  readonly initializeEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        const savedTheme = localStorage.getItem(LS_THEME_KEY)
        if (savedTheme) {
          this.patchState({ theme: savedTheme as UiTheme })
        }
      }),
    ),
  )

  readonly toggleTheme = this.updater((state) => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
  })

  private readonly toggleThemeEffect = this.effect<UiTheme>((theme$) =>
    theme$.pipe(
      tap((theme: UiTheme) => {
        localStorage.setItem(LS_THEME_KEY, theme)
        this.body.classList.remove('dark', 'light')
        this.body.classList.add(theme)
      }),
    ),
  )
}

import { RouterTestingModule } from '@angular/router/testing'
import { UiStore } from '@component-store-playground/shared/data-access/ui-store'
import { SharedUiIconModule, UiIcon } from '@component-store-playground/shared/ui/icon'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'

import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>
  let mockedUiStore: SpyObject<UiStore>

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    providers: [
      mockProvider(UiStore, {
        vm$: of({ theme: 'dark', icon: UiIcon.sun }),
        toggleTheme: jest.fn(),
      }),
    ],
    imports: [RouterTestingModule, SharedUiIconModule],
  })

  beforeEach(() => {
    spectator = createComponent()
    mockedUiStore = spectator.inject(UiStore)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.component.vm$).toBe(mockedUiStore.vm$)
  })

  it('should have header text', () => {
    expect(spectator.query('header > div > a > span')).toHaveText('Component Store Playground')
  })

  it('should contain links', () => {
    spectator.component.links.forEach((link) => {
      expect(spectator.query(`a[href="/${link.path}"]`)).toHaveText(link.label)
    })
  })

  it('should have button with icon', () => {
    expect(spectator.query('button > playground-icon')).toBeTruthy()
    spectator.click('nav > button')
    expect(mockedUiStore.toggleTheme).toHaveBeenCalled()
  })

  it('should have github icon with link', () => {
    expect(spectator.query(`a[href="https://github.com/beeman/component-store-playground"]`)).toBeTruthy()
    expect(spectator.query(`a > playground-icon[icon="github"]`)).toBeTruthy()
  })
})

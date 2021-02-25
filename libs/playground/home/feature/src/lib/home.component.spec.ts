import { RouterTestingModule } from '@angular/router/testing'
import { UiStore } from '@component-store-playground/shared/data-access/ui-store'
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { of } from 'rxjs'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>
  let mockedUiStore: SpyObject<UiStore>

  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [RouterTestingModule],
    providers: [
      mockProvider(UiStore, {
        navItems$: of([]),
      }),
    ],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
    mockedUiStore = spectator.inject(UiStore)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.component.navItems$).toBe(mockedUiStore.navItems$)
  })
})

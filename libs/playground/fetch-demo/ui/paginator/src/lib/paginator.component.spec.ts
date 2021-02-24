import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest'

import { PaginatorComponent } from './paginator.component'
import { PaginatorStore } from './stores'

describe('PaginatorComponent', () => {
  let spectator: Spectator<PaginatorComponent>
  let mockedPaginatorStore: SpyObject<PaginatorStore>

  const createComponent = createComponentFactory({
    component: PaginatorComponent,
    providers: [mockProvider(PaginatorStore)],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
    mockedPaginatorStore = spectator.inject(PaginatorStore, true)
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

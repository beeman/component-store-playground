import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { PageComponent } from './page.component'

describe('PageComponent', () => {
  let spectator: Spectator<PageComponent>
  const createComponent = createComponentFactory(PageComponent)

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

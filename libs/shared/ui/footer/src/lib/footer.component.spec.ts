import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { FooterComponent } from './footer.component'

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>
  const createComponent = createComponentFactory(FooterComponent)

  beforeEach(() => (spectator = createComponent()))

  it('should create and contain footer', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.query('footer')).toBeTruthy()
  })
})

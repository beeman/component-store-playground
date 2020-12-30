import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { LoadingComponent } from './loading.component'

describe('LoadingComponent', () => {
  let spectator: Spectator<LoadingComponent>

  const createComponent = createComponentFactory(LoadingComponent)

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })

  it('should NOT show div', () => {
    expect(spectator.query('div')).not.toBeTruthy()
  })

  it('should show div if loading true', () => {
    spectator.setInput('loading', true)
    expect(spectator.query('div')).toBeTruthy()
  })
})

import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { LayoutComponent } from './layout.component'

describe('LayoutComponent', () => {
  let spectator: Spectator<LayoutComponent>

  const createComponent = createComponentFactory({
    component: LayoutComponent,
    imports: [RouterTestingModule],
    shallow: true,
  })

  beforeEach(() => (spectator = createComponent()))

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })

  it('should contain header, footer, and router-outlet', () => {
    expect(spectator.query('playground-header')).toBeTruthy()
    expect(spectator.query('playground-footer')).toBeTruthy()
    expect(spectator.query('router-outlet')).toBeTruthy()
  })
})

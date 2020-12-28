import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { AuthComponent } from './auth.component'

describe('AuthComponent', () => {
  let spectator: Spectator<AuthComponent>
  const createComponent = createComponentFactory({
    component: AuthComponent,
    imports: [RouterTestingModule],
    shallow: true,
  })

  beforeEach(() => (spectator = createComponent()))

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })

  it('should contain register link', () => {
    expect(spectator.query(`a[href="/register"]`)).toBeTruthy()
  })

  it('should contain login button', () => {
    expect(spectator.query('button[type="button"]')).toHaveText('Login')
  })
})

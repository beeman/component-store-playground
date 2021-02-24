import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { FetchDemoListComponent } from './fetch-demo-list.component'

describe('FetchDemoListComponent', () => {
  let spectator: Spectator<FetchDemoListComponent>

  const createComponent = createComponentFactory({
    component: FetchDemoListComponent,
    imports: [RouterTestingModule],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

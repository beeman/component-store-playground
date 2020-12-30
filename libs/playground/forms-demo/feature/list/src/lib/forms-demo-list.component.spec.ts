import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { FormsDemoListComponent } from './forms-demo-list.component'
import { FormsDemoListStore } from './stores'

describe('FormsDemoListComponent', () => {
  let spectator: Spectator<FormsDemoListComponent>

  const createComponent = createComponentFactory({
    component: FormsDemoListComponent,
    componentProviders: [FormsDemoListStore],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

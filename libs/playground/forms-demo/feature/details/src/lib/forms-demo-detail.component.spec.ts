import { ActivatedRoute } from '@angular/router'
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest'
import { of } from 'rxjs'

import { FormsDemoDetailComponent } from './forms-demo-detail.component'
import { FormsDemoDetailStore } from './stores'

describe('FormsDemoDetailComponent', () => {
  let spectator: Spectator<FormsDemoDetailComponent>

  const createComponent = createComponentFactory({
    component: FormsDemoDetailComponent,
    providers: [mockProvider(ActivatedRoute, { params: of() })],
    componentProviders: [FormsDemoDetailStore],
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

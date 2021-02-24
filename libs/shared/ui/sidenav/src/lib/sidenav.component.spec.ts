import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'

import { SidenavComponent } from './sidenav.component'

describe('SidenavComponent', () => {
  let spectator: Spectator<SidenavComponent>

  const createComponent = createComponentFactory({
    component: SidenavComponent,
    imports: [RouterTestingModule],
    shallow: true,
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ClientSideFilterComponent } from './client-side-filter.component'

describe('ClientSideFilterComponent', () => {
  let component: ClientSideFilterComponent
  let fixture: ComponentFixture<ClientSideFilterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSideFilterComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSideFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FetchDemoListComponent } from './fetch-demo-list.component'

describe('FetchDemoListComponent', () => {
  let component: FetchDemoListComponent
  let fixture: ComponentFixture<FetchDemoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchDemoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchDemoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

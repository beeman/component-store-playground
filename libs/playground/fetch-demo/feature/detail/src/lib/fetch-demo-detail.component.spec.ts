import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FetchDemoDetailComponent } from './fetch-demo-detail.component'

describe('FetchDemoDetailComponent', () => {
  let component: FetchDemoDetailComponent
  let fixture: ComponentFixture<FetchDemoDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchDemoDetailComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchDemoDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

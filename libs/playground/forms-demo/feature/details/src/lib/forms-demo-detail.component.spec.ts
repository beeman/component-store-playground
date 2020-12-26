import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsDemoDetailComponent } from './forms-demo-detail.component'

describe('FormsDemoDetailComponent', () => {
  let component: FormsDemoDetailComponent
  let fixture: ComponentFixture<FormsDemoDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsDemoDetailComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDemoDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

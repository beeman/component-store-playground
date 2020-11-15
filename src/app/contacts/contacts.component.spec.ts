import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContactsComponent } from './contacts.component'

describe('FormsComponent', () => {
  let component: ContactsComponent
  let fixture: ComponentFixture<ContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

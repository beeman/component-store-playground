import { TestBed } from '@angular/core/testing'

import { AngularIdbService } from './angular-idb.service'

interface TestItem {
  name: string
}

describe('AngularIdbService', () => {
  let service: AngularIdbService<TestItem>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AngularIdbService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

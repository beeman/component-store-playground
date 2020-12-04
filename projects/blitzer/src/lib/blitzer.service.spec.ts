import { TestBed } from '@angular/core/testing'

import { BlitzerService } from './blitzer.service'

describe('BlitzerService', () => {
  let service: BlitzerService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BlitzerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

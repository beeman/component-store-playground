import { DOCUMENT } from '@angular/common'
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { take } from 'rxjs/operators'
import { UiStore } from './ui.store'

describe('UiStore', () => {
  let spectator: SpectatorService<UiStore>
  const createService = createServiceFactory({
    service: UiStore,
    providers: [
      {
        provide: DOCUMENT,
        useValue: {
          body: {
            classList: {
              remove: jest.fn(),
              add: jest.fn(),
            },
          },
        },
      },
    ],
  })
  let spiedLSGetItem: jest.SpyInstance
  let spiedLSSetItem: jest.SpyInstance

  beforeEach(() => {
    spectator = createService()
    spiedLSGetItem = jest.spyOn(Storage.prototype, 'getItem')
    spiedLSSetItem = jest.spyOn(Storage.prototype, 'setItem')
  })

  afterEach(() => {
    spiedLSGetItem.mockReset()
    spiedLSSetItem.mockReset()
  })

  describe('initialize', () => {
    it('should initialize', () => {
      expect(spectator.service).toBeTruthy()
    })

    it('should call localStorage.getItem', () => {
      expect(spiedLSGetItem).toHaveBeenCalledTimes(1)
    })

    it('should call localStorage.setItem', () => {
      expect(spiedLSSetItem).toHaveBeenCalledTimes(1)

      const mockedDocument = spectator.inject(DOCUMENT)
      expect(mockedDocument.body.classList.remove).toHaveBeenCalledTimes(3)
      expect(mockedDocument.body.classList.add).toHaveBeenCalledTimes(3)
    })
  })

  it('should toggleTheme', () => {
    // init
    spectator.service.vm$.pipe(take(1)).subscribe((vm) => {
      expect(vm.theme).toEqual('dark')
      expect(spiedLSSetItem).toHaveBeenCalledTimes(1)
    })

    // first toggle
    spectator.service.toggleTheme()
    spectator.service.vm$.pipe(take(1)).subscribe((vm) => {
      expect(vm.theme).toEqual('light')
      expect(spiedLSSetItem).toHaveBeenCalledTimes(2)
    })

    // second toggle
    spectator.service.toggleTheme()
    spectator.service.vm$.pipe(take(1)).subscribe((vm) => {
      expect(vm.theme).toEqual('dark')
      expect(spiedLSSetItem).toHaveBeenCalledTimes(3)
    })
  })
})

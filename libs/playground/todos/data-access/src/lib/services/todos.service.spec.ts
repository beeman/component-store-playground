import { AngularIdb } from '@component-store-playground/shared/data-access/idb'
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { IndexedDBModule } from 'ng-indexed-db'
import { TodosService } from './todos.service'

describe('TodosService', () => {
  let spectator: SpectatorService<TodosService>
  const createService = createServiceFactory({
    service: TodosService,
    providers: [{ provide: AngularIdb, useValue: {} }],
    imports: [IndexedDBModule.forRoot()],
  })

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })
})

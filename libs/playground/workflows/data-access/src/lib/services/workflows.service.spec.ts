import { AngularIdb } from '@component-store-playground/shared/data-access/idb'
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { IndexedDBModule } from 'ng-indexed-db'
import { WorkflowsService } from './workflows.service'

describe('WorkflowsService', () => {
  let spectator: SpectatorService<WorkflowsService>
  const createService = createServiceFactory({
    service: WorkflowsService,
    providers: [{ provide: AngularIdb, useValue: {} }],
    imports: [IndexedDBModule.forRoot()],
  })

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })
})

import { Injectable } from '@angular/core'
import { AngularIdb, AngularIdbService } from '@component-store-playground/playground/shared/idb/util'
import { Workflow } from '../models'

@Injectable({ providedIn: 'root' })
export class WorkflowsService extends AngularIdbService<Workflow> {
  constructor(db: AngularIdb) {
    super(db, 'workflows', { delay: 150 })
  }
}

import { Injectable } from '@angular/core'
import { AngularIdb, AngularIdbService } from '../../angular-idb'
import { Workflow } from './models/workflow'

@Injectable()
export class WorkflowsService extends AngularIdbService<Workflow> {
  constructor(db: AngularIdb) {
    super(db, 'workflows', { delay: 150 })
  }
}

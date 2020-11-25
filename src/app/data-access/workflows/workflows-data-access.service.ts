import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { collectionData } from 'rxfire/firestore'
import { from, Observable, of } from 'rxjs'
import { delay, map, switchMap, take } from 'rxjs/operators'
import { Workflow } from './workflow'

@Injectable()
export class WorkflowsDataAccessService {
  private collectionName = 'workflows'
  private collection = this.afs.collection<Workflow>(this.collectionName)

  workflows$: Observable<Workflow[]> = collectionData<Workflow>(this.collection.ref, 'id').pipe(
    // Add some delay for loading state
    delay(400),
  )

  workflow$(id: string): Observable<Workflow | undefined> {
    return this.collection.doc(id).valueChanges()
  }

  constructor(private readonly afs: AngularFirestore) {}

  addWorkflow(input: Workflow): Observable<any> {
    return of(true).pipe(
      // Add some delay for saving state
      delay(400),
      switchMap(() => from(this.collection.add({ name: input.name, group: input.group }))),
    )
  }

  deleteWorkflow(input: Workflow): Observable<any> {
    return from(this.collection.doc(input.id).delete())
  }

  updateWorkflow(workflow: Workflow): Observable<any> {
    return from(this.collection.doc(workflow.id).update({ ...workflow }))
  }
}

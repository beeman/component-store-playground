import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { collectionData } from 'rxfire/firestore'
import { from, Observable } from 'rxjs'
import { Contact } from './contact'

@Injectable()
export class ContactsDataAccessService {
  private collectionName = 'contacts'
  private collection = this.afs.collection<Contact>(this.collectionName)

  contacts$: Observable<Contact[]> = collectionData<Contact>(this.collection.ref, 'id')

  constructor(private readonly afs: AngularFirestore) {}

  addContact(input: Partial<Contact>): Observable<any> {
    return from(this.collection.add(input as Contact))
  }

  deleteContact(input: Contact): Observable<any> {
    return from(this.collection.doc(input.id).delete())
  }
}

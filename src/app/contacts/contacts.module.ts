import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContactsDataAccessModule } from '../data-access/contacts/contacts-data-access.module'

import { ContactsRoutingModule } from './contacts-routing.module'
import { ContactsComponent } from './contacts.component'

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ContactsRoutingModule, ContactsDataAccessModule],
})
export class ContactsModule {}

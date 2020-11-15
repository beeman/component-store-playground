import { Component } from '@angular/core'
import { Contact } from '../data-access/contacts/contact'
import { ContactsDataAccessService } from '../data-access/contacts/contacts-data-access.service'

@Component({
  template: `
    <div class="bg-gray-100">
      <div class="flex items-start lg:items-center justify-center">
        <div class="container mx-auto px-4 h-full flex">
          <div class="w-3/12">
            <div class=" p-4 bg-grey-lighter py-8">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="sm:flex sm:items-center px-2 py-4">
                  <div class="flex-grow">
                    <h3 class="font-normal px-2 py-3 leading-tight">Add Contacts</h3>
                    <input
                      #name
                      type="text"
                      required="required"
                      placeholder="Name"
                      class="my-2 w-full text-sm bg-blue-100 text-grey-darkest rounded h-10 p-3 focus:outline-none"
                    />
                    <input
                      #email
                      type="email"
                      required="required"
                      placeholder="Email"
                      class="my-2 w-full text-sm bg-blue-100 text-grey-darkest rounded h-10 p-3 focus:outline-none"
                    />
                    <div class="sm:flex bg-grey-light sm:items-center px-2 py-4">
                      <div class="flex-grow text-right">
                        <button
                          class="bg-green-400 hover:bg-blue-dark text-white py-2 px-4 rounded"
                          (click)="addContact(name, email)"
                        >
                          Add Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-9/12">
            <div class=" p-4 bg-grey-lighter py-8">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="sm:flex sm:items-center px-2 py-4">
                  <div class="flex-grow">
                    <h3 class="font-normal px-2 py-3 leading-tight">Contacts</h3>
                    <div class="w-full">
                      <ng-container *ngFor="let contact of contacts$ | async">
                        <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                          <div class="w-3/5 h-10 py-3 px-1">
                            <p class="hover:text-blue-dark">{{ contact.name }}</p>
                          </div>
                          <div class="w-2/5 h-10 text-right p-3">
                            <p class="text-sm text-grey-dark">{{ contact.email }}</p>
                          </div>
                          <div class="py-3">
                            <button class="btn btn-primary" (click)="deleteContact(contact)">
                              <i class="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactsComponent {
  contacts$ = this.service.contacts$
  constructor(private readonly service: ContactsDataAccessService) {
    // this.service.addContact({ email: 'beeman@beeman.nl', name: 'beeman' })
  }

  public addContact(name: HTMLInputElement, email: HTMLInputElement): void {
    this.service.addContact({ email: email.value, name: name.value }).subscribe((res) => {
      // console.log('Contact added', res)
      email.value = ''
      name.value = ''
    })
  }

  public deleteContact(contact: Contact): void {
    this.service.deleteContact(contact).subscribe((res) => {
      console.log('Contact deleted', res)
    })
  }
}

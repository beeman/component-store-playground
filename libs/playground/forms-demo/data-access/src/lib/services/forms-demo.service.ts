import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { demoAddons, demoAdvancedLayout, demoFieldTypes, demoLoginForm } from '../demos'
import { FormsDemo } from '../models'

const demos: FormsDemo[] = [demoFieldTypes, demoAddons, demoAdvancedLayout, demoLoginForm]

@Injectable({ providedIn: 'root' })
export class FormsDemoService {
  list(): Observable<FormsDemo[]> {
    return of([...demos])
  }

  find(id: string): Observable<FormsDemo | undefined> {
    return this.list().pipe(map((items) => items.find((item) => item.path === id)))
  }
}

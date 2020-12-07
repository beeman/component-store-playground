import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { demoAddons } from './demos/demo-addons'
import { demoFieldTypes } from './demos/demo-field-types'
import { demoLoginForm } from './demos/demo-login-form'
import { demoAdvancedLayout } from './demos/demo-advanced-layout'

import { FormsDemo } from './forms-demo'

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

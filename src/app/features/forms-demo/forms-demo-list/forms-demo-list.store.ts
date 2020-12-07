import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { switchMapTo, tap } from 'rxjs/operators'
import { FormsDemoService } from '../forms-demo.service'
import { FormsDemo } from '../forms-demo'

interface FormsDemoState {
  demos?: FormsDemo[]
}

@Injectable()
export class FormsDemoListStore extends ComponentStore<FormsDemoState> {
  constructor(private readonly service: FormsDemoService) {
    super({})
  }

  readonly vm$ = this.select(({ demos }) => ({ demos }))

  readonly loadDemosEffect = this.effect(($) =>
    $.pipe(switchMapTo(this.service.list().pipe(tap((demos) => this.setState({ demos }))))),
  )
}

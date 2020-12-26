import { Injectable } from '@angular/core'
import { FormsDemo, FormsDemoService } from '@component-store-playground/playground/forms-demo/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMapTo } from 'rxjs/operators'

interface FormsDemoState {
  demos: FormsDemo[]
}

@Injectable()
export class FormsDemoListStore extends ComponentStore<FormsDemoState> {
  constructor(private readonly service: FormsDemoService) {
    super({ demos: [] })
  }

  readonly vm$ = this.select(({ demos }) => ({ demos }))

  readonly loadDemosEffect = this.effect(($) =>
    $.pipe(switchMapTo(this.service.list().pipe(tapResponse((demos) => this.setState({ demos }), console.error)))),
  )
}

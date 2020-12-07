import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ComponentStore } from '@ngrx/component-store'
import { pluck, switchMap, tap } from 'rxjs/operators'
import { FormsDemoService } from '../forms-demo.service'
import cloneDeep from 'lodash-es/cloneDeep'
import { FormsDemo } from '../forms-demo'

interface FormsDemoDetailState {
  demo?: FormsDemo
  form?: FormGroup
  model?: any
}

@Injectable()
export class FormsDemoDetailStore extends ComponentStore<FormsDemoDetailState> {
  constructor(private readonly service: FormsDemoService, route: ActivatedRoute) {
    super({})
    this.loadDemoEffect(route.params.pipe(pluck('id')))
  }

  readonly vm$ = this.select(({ demo, form, model }) => ({ demo, form, model }))

  readonly loadDemoEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.service.find(id).pipe(
          tap((demo) => {
            if (demo) {
              this.setState({ demo: cloneDeep(demo), form: new FormGroup({}), model: { ...(demo.model || {}) } })
            }
          }),
        ),
      ),
    ),
  )
}

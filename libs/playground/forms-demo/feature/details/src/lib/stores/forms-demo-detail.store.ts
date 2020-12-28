import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormsDemo, FormsDemoService } from '@component-store-playground/playground/forms-demo/data-access'
// @ts-ignore
import * as cloneDeep from 'lodash.clonedeep'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { pluck, switchMap, tap } from 'rxjs/operators'

interface FormsDemoDetailState {
  demo?: FormsDemo
  form?: FormGroup
  model?: any
}

@Injectable()
export class FormsDemoDetailStore extends ImmerComponentStore<FormsDemoDetailState> {
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

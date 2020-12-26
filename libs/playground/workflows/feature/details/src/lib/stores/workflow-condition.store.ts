import { Injectable } from '@angular/core'
import { WorkflowCondition } from '@component-store-playground/playground/workflows/data-access'
import { ComponentStore } from '@ngrx/component-store'
import { tap, withLatestFrom } from 'rxjs/operators'
import { WorkflowDetailStore } from './workflow-detail.store'

interface WorkflowConditionState {
  conditionId: string
}

@Injectable()
export class WorkflowConditionStore extends ComponentStore<WorkflowConditionState> {
  readonly conditionId$ = this.select((s) => s.conditionId)
  readonly condition$ = this.select(
    this.conditionId$,
    this.workflowDetailStore.conditionNodes$,
    (conditionId, conditionNodes) => conditionNodes.get(conditionId),
  )
  readonly vm$ = this.select(this.condition$, (condition) => ({ condition }))

  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {
    super()
  }

  readonly deleteConditionEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.conditionId$),
      tap(([, conditionId]) => {
        this.workflowDetailStore.removeCondition(conditionId)
      }),
    ),
  )

  readonly updateConditionEffect = this.effect<boolean>((allowDelete$) =>
    allowDelete$.pipe(
      withLatestFrom(this.condition$),
      tap(([allowDelete, condition]) => {
        this.workflowDetailStore.updateCondition({ ...condition, value: allowDelete } as WorkflowCondition)
      }),
    ),
  )

  setConditionId(conditionId: string): void {
    this.setState({ conditionId })
  }
}

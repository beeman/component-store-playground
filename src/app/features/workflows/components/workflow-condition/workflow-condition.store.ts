import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { WorkflowDetailStore } from '../../containers/workflow-detail/workflow-detail.store'
import { WorkflowCondition } from '../../models/workflow-item'

interface WorkflowConditionState {
  conditionId: string
}

@Injectable()
export class WorkflowConditionStore extends ComponentStore<WorkflowConditionState> {
  readonly conditionId$ = this.select((s) => s.conditionId)
  readonly condition$ = this.conditionId$.pipe(
    switchMap((conditionId) => this.workflowDetailStore.getConditionById(conditionId)),
  )

  readonly vm$ = this.select(this.condition$, (condition) => condition)

  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {
    super()
  }

  readonly removeConditionEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.conditionId$),
      tap(([_, conditionId]) => {
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

  setCondition(conditionId: string): void {
    this.setState({ conditionId })
  }
}

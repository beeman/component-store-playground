import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { WorkflowDetailStore } from '../../containers/workflow-detail/workflow-detail.store'

export interface WorkflowGroupState {
  isCollapsed: boolean
  level?: number
  groupId?: string
}

@Injectable()
export class WorkflowGroupStore extends ComponentStore<WorkflowGroupState> {
  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {
    super({
      isCollapsed: false,
    })
  }

  readonly isCollapsed$ = this.select((s) => s.isCollapsed)
  readonly level$ = this.select((s) => s.level)
  readonly groupId$ = this.select((s) => s.groupId)
  readonly group$ = this.groupId$.pipe(switchMap((groupId) => this.workflowDetailStore.getGroupById(groupId as string)))

  readonly vm$ = this.select(
    this.isCollapsed$,
    this.level$,
    this.group$,
    this.workflowDetailStore.maxDepth$,
    (isCollapsed, level, group, maxDepth) => ({
      level,
      group,
      isCollapsed,
      hasNoChildren: !group?.children?.length,
      isAtMaxDepth: level === maxDepth,
      isSubGroup: level && level > 0,
      nextLevel: level != null ? level + 1 : 0,
    }),
  )

  readonly toggleCollapse = this.updater((state) => ({
    ...state,
    isCollapsed: !state.isCollapsed,
  }))

  readonly addGroupEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupId$),
      tap(([_, groupId]) => {
        this.workflowDetailStore.addGroup(groupId as string)
      }),
    ),
  )

  readonly addConditionEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupId$),
      tap(([_, groupId]) => {
        this.workflowDetailStore.addCondition(groupId as string)
      }),
    ),
  )

  // TODO(chau): show alert
  readonly removeEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupId$),
      tap(([_, groupId]) => {
        this.workflowDetailStore.removeGroup(groupId as string)
      }),
    ),
  )

  setGroup(groupId: string, level: number): void {
    this.patchState({ groupId, level })
  }
}

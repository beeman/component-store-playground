import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { tap, withLatestFrom } from 'rxjs/operators'
import { WorkflowDetailStore } from './workflow-detail.store'

interface WorkflowGroupState {
  isCollapsed: boolean
  level?: number
  groupId?: string
}

@Injectable()
export class WorkflowGroupStore extends ComponentStore<WorkflowGroupState> {
  readonly isCollapsed$ = this.select((s) => s.isCollapsed)
  readonly level$ = this.select((s) => s.level!)
  readonly groupId$ = this.select((s) => s.groupId!)
  readonly group$ = this.select(this.groupId$, this.workflowDetailStore.groupNodes$, (groupId, groupNodes) =>
    groupNodes.get(groupId),
  )

  readonly vm$ = this.select(
    this.level$,
    this.isCollapsed$,
    this.group$,
    this.workflowDetailStore.maxDepth$,
    (level, isCollapsed, group, maxDepth) => ({
      level,
      group,
      isCollapsed,
      isAtMaxDepth: level === maxDepth,
      isSubGroup: level > 0,
      hasNoChildren: !group?.children?.length,
      nextLevel: level + 1,
      collapsedIcon: isCollapsed ? 'plusCircle' : 'minusCircle',
    }),
  )

  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {
    super({ isCollapsed: false })
  }

  readonly toggleCollapse = this.updater((state) => ({ ...state, isCollapsed: !state.isCollapsed }))

  readonly addGroupEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupId$),
      tap(([, groupId]) => this.workflowDetailStore.addGroup(groupId)),
    ),
  )

  readonly addConditionEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupId$),
      tap(([, groupId]) => this.workflowDetailStore.addCondition(groupId)),
    ),
  )

  readonly removeEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.group$),
      tap(([, group]) => {
        const groupId = group?.id!
        const shouldRemove =
          !group?.children?.length ||
          (group?.children?.length && confirm('Removing a group will remove all of its children?'))
        if (shouldRemove) {
          this.workflowDetailStore.removeGroup(groupId)
        }
      }),
    ),
  )

  setGroup(groupId: string, level: number): void {
    this.patchState({ groupId, level })
  }
}

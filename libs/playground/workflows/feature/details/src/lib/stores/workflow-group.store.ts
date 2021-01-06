import { Inject, Injectable } from '@angular/core'
import {
  IS_EXTENSION_PRESENT,
  REDUX_DEVTOOLS_EXTENSION_CONNECTION,
  ReduxComponentStore,
  ReduxDevtoolsExtensionConnection,
} from '@component-store-playground/shared/util/component-store-devtools'
import { tap, withLatestFrom } from 'rxjs/operators'
import { WorkflowDetailsStore } from './workflow-details.store'

interface WorkflowGroupState {
  isCollapsed: boolean
  level?: number
  groupId?: string
}

@Injectable()
export class WorkflowGroupStore extends ReduxComponentStore<WorkflowGroupState> {
  readonly groupId$ = this.select((s) => s.groupId!)
  readonly group$ = this.select(this.groupId$, this.workflowDetailStore.groupNodes$, (groupId, groupNodes) =>
    groupNodes.get(groupId),
  )

  readonly vm$ = this.select(
    this.state$,
    this.group$,
    this.workflowDetailStore.maxDepth$,
    ({ level, isCollapsed }, group, maxDepth) => ({
      level,
      group,
      isCollapsed,
      isAtMaxDepth: level === maxDepth,
      isSubGroup: level! > 0,
      hasNoChildren: !group?.children?.length,
      nextLevel: level! + 1,
      collapsedIcon: isCollapsed ? 'plusCircle' : 'minusCircle',
    }),
  )

  constructor(
    private readonly workflowDetailStore: WorkflowDetailsStore,
    @Inject(IS_EXTENSION_PRESENT) isExtensionPresent?: boolean,
    @Inject(REDUX_DEVTOOLS_EXTENSION_CONNECTION) devToolsConnection?: ReduxDevtoolsExtensionConnection,
  ) {
    super(undefined, isExtensionPresent, devToolsConnection)
  }

  readonly toggleCollapse = this.updater((state) => {
    state.isCollapsed = !state.isCollapsed
  })

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
    this.setState({ groupId, level, isCollapsed: false })
  }
}

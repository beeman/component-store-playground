import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ComponentStore } from '@ngrx/component-store'
import { Draft } from 'immer'
import { map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { mutableReducer } from '../../../../util/mutable-reducer'
import { randomId } from '../../../../util/random-id'
import { Workflow } from '../../models/workflow'
import { NormalizedWorkflowGroup, WorkflowCondition, WorkflowGroup, WorkflowType } from '../../models/workflow-item'
import { WorkflowsService } from '../../workflows.service'

interface WorkflowDetailState {
  saving: boolean
  loading: boolean
  maxDepth: number
  workflow?: Workflow
  groupNodes?: Map<string, NormalizedWorkflowGroup>
  conditionNodes?: Map<string, WorkflowCondition>
}

@Injectable()
export class WorkflowDetailStore extends ComponentStore<WorkflowDetailState> {
  constructor(private readonly service: WorkflowsService, private readonly route: ActivatedRoute) {
    super({
      loading: false,
      saving: false,
      maxDepth: 2,
    })
    this.initializeEffect(route.params.pipe(pluck('workflowId')))
  }

  readonly loading$ = this.select((s) => s.loading)
  readonly saving$ = this.select((s) => s.saving)
  readonly workflow$ = this.select((s) => s.workflow)
  readonly maxDepth$ = this.select((s) => s.maxDepth)
  readonly workflowInfo$ = this.select(
    this.workflow$,
    this.loading$,
    this.saving$,
    this.maxDepth$,
    (workflow, loading, saving, maxDepth) => ({ workflow, loading, saving, maxDepth }),
  )
  readonly groupNodes$ = this.select((s) => s.groupNodes)
  readonly conditionNodes$ = this.select((s) => s.conditionNodes)

  readonly vm$ = this.select(
    this.workflowInfo$,
    this.groupNodes$,
    this.conditionNodes$,
    ({ maxDepth, workflow, loading, saving }, groupNodes) => ({
      maxDepth,
      workflow,
      loading,
      saving,
      root: (groupNodes?.values().next().value as WorkflowGroup)?.id,
    }),
  )

  readonly initializeEffect = this.effect<string>((workflowId$) =>
    workflowId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((workflowId) =>
        this.service.workflow$(workflowId).pipe(
          tap((workflow) => {
            const { groupNodes, conditionNodes } = this.normalize(workflow?.group as WorkflowGroup)
            this.patchState({
              workflow: workflow as Workflow,
              saving: false,
              loading: false,
              groupNodes,
              conditionNodes,
            })
          }),
        ),
      ),
    ),
  )

  readonly saveWorkflowEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupNodes$, this.conditionNodes$, this.workflow$),
      map(([_, groupNodes, conditionNodes, workflow]) => {
        const denormalizedTree = this.denormalize(
          groupNodes as Map<string, NormalizedWorkflowGroup>,
          conditionNodes as Map<string, WorkflowCondition>,
        )
        return {
          ...workflow,
          group: denormalizedTree,
        }
      }),
      switchMap((workflow: Workflow) => this.service.updateWorkflow(workflow)),
    ),
  )

  // readonly addGroup = this.updater<string>((state, groupId) => {
  //   const newGroupId = randomId()
  //   const group = state.groupNodes?.get(groupId) as NormalizedWorkflowGroup
  //   return {
  //     ...state,
  //     groupNodes: new Map<string, NormalizedWorkflowGroup>(state.groupNodes as Map<string, NormalizedWorkflowGroup>)
  //       .set(newGroupId, {
  //         id: newGroupId,
  //         type: WorkflowType.group,
  //         parentId: groupId,
  //         children: [],
  //       })
  //       .set(groupId, {
  //         ...group,
  //         children: [...(group.children ?? []), { id: newGroupId, type: WorkflowType.group }],
  //       }),
  //   }
  // })
  readonly addGroup = this.updater<string>(
    mutableReducer((state, groupId) => {
      const newGroupId = randomId()
      state.groupNodes?.set(newGroupId, {
        id: newGroupId,
        parentId: groupId,
        type: WorkflowType.group,
        children: [],
      })
      state.groupNodes?.get(groupId as string)?.children?.push({ id: newGroupId, type: WorkflowType.group })
    }),
  )

  // readonly addCondition = this.updater<string>((state, groupId) => {
  //   const newConditionId = randomId()
  //   const group = state.groupNodes?.get(groupId) as NormalizedWorkflowGroup
  //   return {
  //     ...state,
  //     groupNodes: new Map<string, NormalizedWorkflowGroup>(
  //       state.groupNodes as Map<string, NormalizedWorkflowGroup>,
  //     ).set(groupId, {
  //       ...group,
  //       children: [...(group.children ?? []), { id: newConditionId, type: WorkflowType.condition }],
  //     }),
  //     conditionNodes: new Map<string, WorkflowCondition>(state.conditionNodes as Map<string, WorkflowCondition>).set(
  //       newConditionId,
  //       {
  //         id: newConditionId,
  //         parentId: groupId,
  //         type: WorkflowType.condition,
  //         value: false,
  //       },
  //     ),
  //   }
  // })
  readonly addCondition = this.updater<string>(
    mutableReducer((state, groupId) => {
      const newConditionId = randomId()
      state.conditionNodes?.set(newConditionId, {
        id: newConditionId,
        parentId: groupId,
        type: WorkflowType.condition,
        value: false,
      })
      state.groupNodes?.get(groupId as string)?.children?.push({ id: newConditionId, type: WorkflowType.condition })
    }),
  )

  // readonly removeGroup = this.updater<string>((state, groupId) => {
  //   const clonedGroupNodes = new Map<string, NormalizedWorkflowGroup>(
  //     state.groupNodes as Map<string, NormalizedWorkflowGroup>,
  //   )
  //   const clonedConditionNodes = new Map<string, WorkflowCondition>(
  //     state.conditionNodes as Map<string, WorkflowCondition>,
  //   )
  //   const group = state.groupNodes?.get(groupId) as NormalizedWorkflowGroup
  //   const parent = state.groupNodes?.get(group.parentId as string) as NormalizedWorkflowGroup
  //   const conditionsToRemove = group.children?.filter((child) => child.type === WorkflowType.condition) ?? []
  //   const groupsToRemove = group.children?.filter((child) => child.type === WorkflowType.group) ?? []
  //
  //   clonedGroupNodes
  //     .set(parent.id as string, { ...parent, children: parent.children?.filter((child) => child.id !== groupId) ?? [] })
  //     .delete(groupId)
  //
  //   for (const childGroup of groupsToRemove) {
  //     clonedGroupNodes.delete(childGroup.id)
  //   }
  //
  //   for (const childCondition of conditionsToRemove) {
  //     clonedConditionNodes.delete(childCondition.id)
  //   }
  //
  //   return {
  //     ...state,
  //     groupNodes: clonedGroupNodes,
  //     conditionNodes: clonedConditionNodes,
  //   }
  // })
  readonly removeGroup = this.updater<string>(
    mutableReducer((state, groupId) => {
      const group = state.groupNodes?.get(groupId as string) as NormalizedWorkflowGroup
      this.deleteGroupRecursive(state, group)

      const parent = state.groupNodes?.get(group?.parentId as string) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== groupId) ?? []
    }),
  )

  // readonly removeCondition = this.updater<string>((state, conditionId) => {
  //   const condition = state.conditionNodes?.get(conditionId) as WorkflowCondition
  //   const parent = state.groupNodes?.get(condition.parentId as string) as NormalizedWorkflowGroup
  //
  //   const clonedConditionNodes = new Map<string, WorkflowCondition>(
  //     state.conditionNodes as Map<string, WorkflowCondition>,
  //   )
  //   clonedConditionNodes.delete(conditionId)
  //
  //   return {
  //     ...state,
  //     groupNodes: new Map<string, NormalizedWorkflowGroup>(
  //       state.groupNodes as Map<string, NormalizedWorkflowGroup>,
  //     ).set(parent.id as string, {
  //       ...parent,
  //       children: parent.children?.filter((child) => child.id !== conditionId) ?? [],
  //     }),
  //     conditionNodes: clonedConditionNodes,
  //   }
  // })

  readonly removeCondition = this.updater<string>(
    mutableReducer((state, conditionId) => {
      const condition = state.conditionNodes?.get(conditionId as string)
      state.conditionNodes?.delete(conditionId as string)
      const parent = state.groupNodes?.get(condition?.parentId as string) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== conditionId) ?? []
    }),
  )

  readonly updateCondition = this.updater<WorkflowCondition>(
    mutableReducer((state, value) => {
      if (state.conditionNodes?.has(value?.id as string)) {
        state.conditionNodes?.set(value?.id as string, value as WorkflowCondition)
      }
    }),
  )

  private static isGroup(item: { type: WorkflowType }): item is WorkflowGroup {
    return item.type === WorkflowType.group
  }

  readonly getGroupById = (id: string) => this.select(this.groupNodes$, (groupNodes) => groupNodes?.get(id))

  readonly getConditionById = (id: string) =>
    this.select(this.conditionNodes$, (conditionNodes) => conditionNodes?.get(id))

  private normalize(
    group: WorkflowGroup,
    groupNodes: Map<string, NormalizedWorkflowGroup> = new Map<string, NormalizedWorkflowGroup>(),
    conditionNodes: Map<string, WorkflowCondition> = new Map<string, WorkflowCondition>(),
  ): { groupNodes: Map<string, NormalizedWorkflowGroup>; conditionNodes: Map<string, WorkflowCondition> } {
    if (group.parentId == null) {
      groupNodes.set(group.id as string, {
        ...group,
        children: group.children?.map((item) => ({ id: item.id as string, type: item.type })) ?? [],
      })
    }

    if (group.children) {
      for (const child of group.children) {
        if (WorkflowDetailStore.isGroup(child)) {
          groupNodes.set(child.id as string, {
            ...child,
            children: child.children?.map((item) => ({ id: item.id as string, type: item.type })) ?? [],
          })
          this.normalize(child, groupNodes, conditionNodes)
        } else {
          conditionNodes.set(child.id as string, child as WorkflowCondition)
        }
      }
    }

    return { groupNodes, conditionNodes }
  }

  private denormalize(
    groupNodes: Map<string, NormalizedWorkflowGroup>,
    conditionNodes: Map<string, WorkflowCondition>,
    group: WorkflowGroup = { ...groupNodes.values().next().value, children: [] },
  ): WorkflowGroup {
    const normalizedGroup = groupNodes.get(group.id as string) as NormalizedWorkflowGroup

    if (normalizedGroup.children) {
      for (const child of normalizedGroup.children) {
        if (child.type === WorkflowType.group) {
          const childGroup = this.denormalize(groupNodes, conditionNodes, {
            ...(groupNodes.get(child.id) ?? {}),
            children: [],
          } as WorkflowGroup)
          group.children = [...(group?.children ?? []), childGroup]
        } else {
          group.children = [...(group?.children ?? []), conditionNodes.get(child.id) as WorkflowCondition]
        }
      }
    }

    return group
  }

  private deleteGroupRecursive(state: Draft<WorkflowDetailState>, group: NormalizedWorkflowGroup): void {
    state.groupNodes?.delete(group.id as string)
    if (group.children) {
      for (const child of group.children) {
        if (child.type === WorkflowType.group) {
          this.deleteGroupRecursive(state, state.groupNodes?.get(child.id) as NormalizedWorkflowGroup)
        } else {
          state.conditionNodes?.delete(child.id)
        }
      }
    }
  }
}

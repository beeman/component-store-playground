import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  NormalizedWorkflowGroup,
  Workflow,
  WorkflowCondition,
  WorkflowGroup,
  WorkflowsService,
  WorkflowType,
} from '@component-store-playground/playground/workflows/data-access'
import { randomId, WorkflowHelper } from '@component-store-playground/playground/workflows/util'
import { ApiResponse } from '@component-store-playground/shared/util/rx'
import { tapResponse } from '@ngrx/component-store'
import { ImmerComponentStore } from 'ngrx-immer/component-store'
import { map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'

/**
 * tree: {
 *   id: 1,
 *   parentId: null,
 *   type: group,
 *   children: [
 *     {
 *       id: 2,
 *       parentId: 1,
 *       type: group,
 *       children: [
 *         {
 *           type: 3,
 *           parentId: 2,
 *           type: condition
 *         }
 *       ]
 *     }
 *   ]
 * }
 *
 * groupNodes: {
 *   1: {
 *     type: group,
 *     parentId: null,
 *     children: [{id: 2, type: group}]
 *   },
 *   2: {
 *     type: group
 *     parentId: 1,
 *     children: [{id: 3, type: condition}]
 *   }
 * }
 *
 * conditionNodes: {
 *   3: {
 *     type: condition, value: true
 *   }
 * }
 */

interface WorkflowDetailsState {
  saving: boolean
  workflow: ApiResponse<Workflow>
  groupNodes: Map<string, NormalizedWorkflowGroup>
  conditionNodes: Map<string, WorkflowCondition>
  currentLevels: Set<number>
}

interface AddGroupParams {
  parentId: string
  level: number
}

@Injectable()
export class WorkflowDetailsStore extends ImmerComponentStore<WorkflowDetailsState> {
  readonly workflow$ = this.select((s) => s.workflow)
  readonly maxDepth$ = this.select(this.workflow$, (workflow) => workflow.data?.maxDepth || 2)
  readonly groupNodes$ = this.select((s) => s.groupNodes)
  readonly conditionNodes$ = this.select((s) => s.conditionNodes)

  readonly vm$ = this.select(this.state$, ({ workflow: { data, status }, groupNodes, currentLevels }) => {
    return {
      workflow: data,
      loading: status === 'loading',
      root: (groupNodes.values().next().value as WorkflowGroup)?.id,
      currentMaxLevel: Math.max(...currentLevels.values()),
    }
  })

  constructor(private readonly service: WorkflowsService, route: ActivatedRoute) {
    super({
      saving: false,
      workflow: { data: null, status: 'idle', error: '' },
      groupNodes: new Map<string, NormalizedWorkflowGroup>(),
      conditionNodes: new Map<string, WorkflowCondition>(),
      currentLevels: new Set<number>(),
    })
    this.initializeEffect(route.params.pipe(pluck('workflowId')))
  }

  readonly initializeEffect = this.effect<string>((workflowId$) =>
    workflowId$.pipe(
      switchMap((workflowId) =>
        this.service.item(workflowId).pipe(
          tapResponse((workflow: ApiResponse<Workflow>) => {
            if (workflow.status === 'loading') {
              this.patchState({ workflow })
            } else {
              const { groupNodes, conditionNodes } = WorkflowHelper.normalize(workflow.data!.group)
              this.patchState({
                saving: false,
                workflow,
                groupNodes,
                conditionNodes,
                currentLevels: new Set<number>([...groupNodes.values()].map((group) => group.level)),
              })
            }
          }, console.error),
        ),
      ),
    ),
  )

  readonly addGroup = this.updater<AddGroupParams>((state, { parentId, level }) => {
    const newGroupId = randomId()
    state.groupNodes!.set(newGroupId, {
      id: newGroupId,
      parentId,
      type: WorkflowType.group,
      children: [],
      level: level + 1,
    })
    state.groupNodes.get(parentId!)?.children.push({ id: newGroupId, type: WorkflowType.group })
    state.currentLevels.add(level + 1)
  })

  readonly addCondition = this.updater<string>((state, parentId) => {
    const newConditionId = randomId()
    state.conditionNodes.set(newConditionId, {
      id: newConditionId,
      parentId,
      type: WorkflowType.condition,
      value: false,
    })
    state.groupNodes.get(parentId!)?.children.push({ id: newConditionId, type: WorkflowType.condition })
  })

  readonly removeGroup = this.updater<string>((state, groupId) => {
    const group = state.groupNodes!.get(groupId!) as NormalizedWorkflowGroup
    WorkflowHelper.deleteGroupRecursive(state.groupNodes, state.conditionNodes, group)

    const parent = state.groupNodes.get(group.parentId!) as NormalizedWorkflowGroup
    parent.children = parent.children?.filter((child) => child.id !== groupId) ?? []

    const isLastGroupAtLevel = ![...state.groupNodes.values()].some((groupNode) => groupNode.level === group.level)
    if (isLastGroupAtLevel) {
      state.currentLevels.delete(group.level)
    }
  })

  readonly removeCondition = this.updater<string>((state, conditionId) => {
    const condition = state.conditionNodes.get(conditionId!) as WorkflowCondition
    state.conditionNodes!.delete(conditionId!)

    const parent = state.groupNodes.get(condition.parentId!) as NormalizedWorkflowGroup
    parent.children = parent.children?.filter((child) => child.id !== conditionId) ?? []
  })

  readonly updateCondition = this.updater<WorkflowCondition>((state, condition) => {
    if (state.conditionNodes.has(condition.id!)) {
      state.conditionNodes.set(condition.id!, condition)
    }
  })

  readonly saveWorkflowEffect = this.effect<{ workflowName: string; maxDepth: number }>((saveParams$) =>
    saveParams$.pipe(
      withLatestFrom(this.groupNodes$, this.conditionNodes$, this.workflow$),
      map(([{ workflowName, maxDepth }, groupNodes, conditionNodes, { data }]) => {
        const denormalizedTree = WorkflowHelper.denormalize(groupNodes, conditionNodes)
        return {
          ...data,
          maxDepth,
          name: workflowName,
          group: denormalizedTree,
        }
      }),
      switchMap((updatedWorkflow: Workflow) =>
        this.service.update(updatedWorkflow.id!, updatedWorkflow).pipe(
          tap((workflow) => {
            this.patchState((state) => ({
              workflow: { ...state.workflow, data: workflow },
            }))
          }),
        ),
      ),
    ),
  )
}

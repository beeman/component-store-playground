import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiResponse } from '@component-store-playground/playground/shared/utils/types'
import {
  NormalizedWorkflowGroup,
  Workflow,
  WorkflowCondition,
  WorkflowGroup,
  WorkflowsService,
  WorkflowType,
} from '@component-store-playground/playground/workflows/data-access'
import { randomId, WorkflowHelper } from '@component-store-playground/playground/workflows/util'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { immerReducer } from 'ngrx-immer'
import { map, pluck, switchMap, withLatestFrom } from 'rxjs/operators'

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

export interface WorkflowDetailState {
  saving: boolean
  maxDepth: number
  workflow: ApiResponse<Workflow>
  groupNodes: Map<string, NormalizedWorkflowGroup>
  conditionNodes: Map<string, WorkflowCondition>
}

@Injectable()
export class WorkflowDetailStore extends ComponentStore<WorkflowDetailState> {
  readonly maxDepth$ = this.select((s) => s.maxDepth)
  readonly workflow$ = this.select((s) => s.workflow)
  readonly groupNodes$ = this.select((s) => s.groupNodes)
  readonly conditionNodes$ = this.select((s) => s.conditionNodes)

  readonly vm$ = this.select(
    this.workflow$,
    this.maxDepth$,
    this.groupNodes$,
    this.conditionNodes$,
    ({ data, status, error }, maxDepth, groupNodes, conditionNodes) => {
      return {
        workflow: data,
        loading: status === 'loading',
        maxDepth,
        root: (groupNodes.values().next().value as WorkflowGroup)?.id,
      }
    },
  )

  constructor(private readonly service: WorkflowsService, route: ActivatedRoute) {
    super({
      saving: false,
      maxDepth: 2,
      workflow: { data: null, status: 'idle', error: '' },
      groupNodes: new Map<string, NormalizedWorkflowGroup>(),
      conditionNodes: new Map<string, WorkflowCondition>(),
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
              })
            }
          }, console.error),
        ),
      ),
    ),
  )

  readonly addGroup = this.updater<string>(
    immerReducer((state, parentId) => {
      const newGroupId = randomId()
      state.groupNodes!.set(newGroupId, {
        id: newGroupId,
        parentId,
        type: WorkflowType.group,
        children: [],
      })
      state.groupNodes.get(parentId!)?.children.push({ id: newGroupId, type: WorkflowType.group })
    }),
  )

  readonly addCondition = this.updater<string>(
    immerReducer((state, parentId) => {
      const newConditionId = randomId()
      state.conditionNodes.set(newConditionId, {
        id: newConditionId,
        parentId,
        type: WorkflowType.condition,
        value: false,
      })
      state.groupNodes.get(parentId!)?.children.push({ id: newConditionId, type: WorkflowType.condition })
    }),
  )

  readonly removeGroup = this.updater<string>(
    immerReducer((state, groupId) => {
      const group = state.groupNodes!.get(groupId!) as NormalizedWorkflowGroup
      WorkflowHelper.deleteGroupRecursive(state.groupNodes, state.conditionNodes, group)

      const parent = state.groupNodes.get(group.parentId!) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== groupId) ?? []
    }),
  )

  readonly removeCondition = this.updater<string>(
    immerReducer((state, conditionId) => {
      const condition = state.conditionNodes.get(conditionId!) as WorkflowCondition
      state.conditionNodes!.delete(conditionId!)

      const parent = state.groupNodes.get(condition.parentId!) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== conditionId) ?? []
    }),
  )

  readonly updateCondition = this.updater<WorkflowCondition>(
    immerReducer((state, condition) => {
      if (state.conditionNodes.has(condition.id!)) {
        state.conditionNodes.set(condition.id!, condition)
      }
    }),
  )

  readonly saveWorkflowEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupNodes$, this.conditionNodes$, this.workflow$),
      map(([, groupNodes, conditionNodes, { data }]) => {
        const denormalizedTree = WorkflowHelper.denormalize(groupNodes, conditionNodes)
        return {
          ...data,
          name: data!.name,
          group: denormalizedTree,
        }
      }),
      switchMap((updatedWorkflow: Workflow) => this.service.update(updatedWorkflow.id!, updatedWorkflow)),
    ),
  )
}

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ComponentStore } from '@ngrx/component-store'
import { map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { mutableReducer } from '../../../../util/mutable-reducer'
import { randomId } from '../../../../util/random-id'
import { WorkflowDetailHelper } from '../../../../util/workflow-detail-helper'
import { Workflow } from '../../models/workflow'
import { NormalizedWorkflowGroup, WorkflowCondition, WorkflowGroup, WorkflowType } from '../../models/workflow-item'
import { WorkflowsService } from '../../workflows.service'

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
  loading: boolean
  maxDepth: number
  workflow?: Workflow
  groupNodes?: Map<string, NormalizedWorkflowGroup>
  conditionNodes?: Map<string, WorkflowCondition>
}

@Injectable()
export class WorkflowDetailStore extends ComponentStore<WorkflowDetailState> {
  readonly loading$ = this.select((s) => s.loading)
  readonly maxDepth$ = this.select((s) => s.maxDepth)
  readonly workflow$ = this.select((s) => s.workflow)
  readonly workflowInfo$ = this.select(
    this.loading$,
    this.workflow$,
    this.maxDepth$,
    (loading, workflow, maxDepth) => ({ loading, workflow, maxDepth }),
  )

  readonly groupNodes$ = this.select((s) => s.groupNodes)
  readonly conditionNodes$ = this.select((s) => s.conditionNodes)

  readonly vm$ = this.select(
    this.workflowInfo$,
    this.groupNodes$,
    this.conditionNodes$,
    ({ maxDepth, workflow, loading }, groupNodes, conditionNodes) => {
      return {
        workflow,
        loading,
        maxDepth,
        root: (groupNodes?.values().next().value as WorkflowGroup)?.id,
      }
    },
  )

  constructor(private readonly service: WorkflowsService, route: ActivatedRoute) {
    super({ loading: false, saving: false, maxDepth: 2 })
    this.initializeEffect(route.params.pipe(pluck('workflowId')))
  }

  readonly initializeEffect = this.effect<string>((workflowId$) =>
    workflowId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((workflowId) =>
        this.service.item(workflowId).pipe(
          tap((workflow) => {
            const { groupNodes, conditionNodes } = WorkflowDetailHelper.normalize(workflow.group!)
            this.patchState({
              loading: false,
              saving: false,
              workflow,
              groupNodes,
              conditionNodes,
            })
          }),
        ),
      ),
    ),
  )

  readonly addGroup = this.updater<string>(
    mutableReducer((state, parentId) => {
      const newGroupId = randomId()
      state.groupNodes!.set(newGroupId, {
        id: newGroupId,
        parentId,
        type: WorkflowType.group,
        children: [],
      })
      state.groupNodes!.get(parentId!)?.children!.push({ id: newGroupId, type: WorkflowType.group })
    }),
  )

  readonly addCondition = this.updater<string>(
    mutableReducer((state, parentId) => {
      const newConditionId = randomId()
      state.conditionNodes!.set(newConditionId, {
        id: newConditionId,
        parentId,
        type: WorkflowType.condition,
        value: false,
      })
      state.groupNodes!.get(parentId!)?.children!.push({ id: newConditionId, type: WorkflowType.condition })
    }),
  )

  readonly removeGroup = this.updater<string>(
    mutableReducer((state, groupId) => {
      const group = state.groupNodes!.get(groupId!) as NormalizedWorkflowGroup
      WorkflowDetailHelper.deleteGroupRecursive(state, group)

      const parent = state.groupNodes!.get(group.parentId!) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== groupId) ?? []
    }),
  )

  readonly removeCondition = this.updater<string>(
    mutableReducer((state, conditionId) => {
      const condition = state.conditionNodes!.get(conditionId!) as WorkflowCondition
      state.conditionNodes!.delete(conditionId!)

      const parent = state.groupNodes!.get(condition.parentId!) as NormalizedWorkflowGroup
      parent.children = parent.children?.filter((child) => child.id !== conditionId) ?? []
    }),
  )

  readonly updateCondition = this.updater<WorkflowCondition>(
    mutableReducer((state, condition) => {
      if (state.conditionNodes?.has(condition?.id!)) {
        state.conditionNodes?.set(condition?.id!, condition!)
      }
    }),
  )

  readonly saveWorkflowEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.groupNodes$, this.conditionNodes$, this.workflow$),
      map(([, groupNodes, conditionNodes, workflow]) => {
        const denormalizedTree = WorkflowDetailHelper.denormalize(groupNodes!, conditionNodes!)
        return {
          ...workflow,
          group: denormalizedTree,
        }
      }),
      switchMap((updatedWorkflow: Workflow) => this.service.update(updatedWorkflow.id!, updatedWorkflow)),
    ),
  )

  readonly getGroupById = (id: string) => this.select(this.groupNodes$, (groupNodes) => groupNodes!.get(id))
  readonly getConditionById = (id: string) =>
    this.select(this.conditionNodes$, (conditionNodes) => conditionNodes!.get(id))
}

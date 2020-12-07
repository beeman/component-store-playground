import { Draft } from 'immer'
import { WorkflowDetailState } from '../features/workflows/containers/workflow-detail/workflow-detail.store'
import {
  NormalizedWorkflowGroup,
  WorkflowCondition,
  WorkflowGroup,
  WorkflowItem,
  WorkflowType,
} from '../features/workflows/models/workflow-item'

export class WorkflowDetailHelper {
  static isGroup(item: WorkflowItem): item is WorkflowGroup {
    return item.type === WorkflowType.group
  }

  static normalize(
    group: WorkflowGroup,
    groupNodes: Map<string, NormalizedWorkflowGroup> = new Map<string, NormalizedWorkflowGroup>(),
    conditionNodes: Map<string, WorkflowCondition> = new Map<string, WorkflowCondition>(),
  ): { groupNodes: Map<string, NormalizedWorkflowGroup>; conditionNodes: Map<string, WorkflowCondition> } {
    if (group.parentId == null) {
      groupNodes.set(group.id!, {
        id: group.id,
        type: WorkflowType.group,
        children: group.children!.map((child) => ({ type: child.type, id: child.id })),
      })
    }

    if (group.children) {
      for (const child of group.children) {
        if (this.isGroup(child)) {
          groupNodes.set(child.id!, {
            id: child.id,
            parentId: group.id,
            type: WorkflowType.group,
            children: child.children!.map((item) => ({ type: item.type, id: item.id })),
          })
          this.normalize(child, groupNodes, conditionNodes)
        } else {
          conditionNodes.set(child.id!, {
            id: child.id,
            parentId: group.id,
            type: WorkflowType.condition,
            value: (child as WorkflowCondition).value ?? false,
          })
        }
      }
    }

    return { groupNodes, conditionNodes }
  }

  static deleteGroupRecursive(state: Draft<WorkflowDetailState>, group: NormalizedWorkflowGroup): void {
    state.groupNodes!.delete(group.id!)
    if (group.children) {
      for (const child of group.children) {
        if (child.type === WorkflowType.group) {
          this.deleteGroupRecursive(state, state.groupNodes!.get(child.id!) as NormalizedWorkflowGroup)
        } else {
          state.conditionNodes!.delete(child.id!)
        }
      }
    }
  }
}

import {
  NormalizedWorkflowGroup,
  WorkflowCondition,
  WorkflowGroup,
  WorkflowItem,
  WorkflowType,
} from '@component-store-playground/playground/workflows/data-access'

export class WorkflowHelper {
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

  static denormalize(
    groupNodes: Map<string, NormalizedWorkflowGroup>,
    conditionNodes: Map<string, WorkflowCondition>,
    group: WorkflowGroup = { ...groupNodes.values().next().value, children: [] },
  ): WorkflowGroup {
    const normalizedGroup = groupNodes.get(group.id!) as NormalizedWorkflowGroup

    if (normalizedGroup.children) {
      for (const child of normalizedGroup.children) {
        if (child.type === WorkflowType.group) {
          const normalizedChildGroup: WorkflowGroup = { ...groupNodes.get(child.id!)!, children: [] }
          const childGroup = this.denormalize(groupNodes, conditionNodes, normalizedChildGroup)
          group.children = [...(group.children ?? []), childGroup]
        } else {
          group.children = [...(group.children ?? []), conditionNodes.get(child.id!) as WorkflowCondition]
        }
      }
    }

    return group
  }

  static deleteGroupRecursive(
    groupNodes: Map<string, NormalizedWorkflowGroup>,
    conditionNodes: Map<string, WorkflowCondition>,
    group: NormalizedWorkflowGroup,
  ): void {
    groupNodes!.delete(group.id!)
    if (group.children) {
      for (const child of group.children) {
        if (child.type === WorkflowType.group) {
          this.deleteGroupRecursive(groupNodes, conditionNodes, groupNodes!.get(child.id!) as NormalizedWorkflowGroup)
        } else {
          conditionNodes!.delete(child.id!)
        }
      }
    }
  }
}

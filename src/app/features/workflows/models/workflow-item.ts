export enum WorkflowType {
  condition = 'condition',
  group = 'group',
}

export interface WorkflowItem {
  id?: string
  parentId?: string
  type: WorkflowType
}

export interface WorkflowCondition extends WorkflowItem {
  readonly type: WorkflowType.condition
  value: boolean
}

export interface WorkflowGroup extends WorkflowItem {
  readonly type: WorkflowType.group
  children?: WorkflowItem[]
}

export interface NormalizedWorkflowItem {
  id: string
  type: WorkflowType
}

export interface NormalizedWorkflowGroup extends Omit<WorkflowGroup, 'children'> {
  children?: NormalizedWorkflowItem[]
}

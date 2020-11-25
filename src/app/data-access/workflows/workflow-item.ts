export enum WorkflowType {
  condition = 'condition',
  group = 'group',
}

export interface WorkflowItem {
  id?: string
  parentId?: string
  type: WorkflowType
  children?: WorkflowItem[]
}

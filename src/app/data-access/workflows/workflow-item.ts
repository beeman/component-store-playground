export enum WorkflowType {
  condition = 'condition',
  group = 'group',
}

export interface WorkflowItem {
  id?: string
  type: WorkflowType
  children?: WorkflowItem[]
}

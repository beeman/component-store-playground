import { WorkflowItem } from './workflow-item'

export interface Workflow {
  id?: string
  name?: string
  group?: WorkflowItem
}

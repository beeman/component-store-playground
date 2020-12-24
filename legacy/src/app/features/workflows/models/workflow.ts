import { WorkflowGroup } from './workflow-item'

export interface Workflow {
  id?: string
  name?: string
  group?: WorkflowGroup
}

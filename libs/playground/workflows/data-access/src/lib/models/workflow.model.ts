import { WorkflowGroup } from './workflow-item.model'

export interface Workflow {
  id?: string
  name: string
  group: WorkflowGroup
}

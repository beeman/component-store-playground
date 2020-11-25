import { Component, Input } from '@angular/core'
import { WorkflowItem } from '../../data-access/workflows/workflow-item'

@Component({
  selector: 'app-workflow-condition',
  template: `
    <div class="ml-6  border border-gray-400">
      <h2 class="py-2 px-3 bg-gray-200 text-gray-900">Condition: {{ node.id }}</h2>
      <div class="p-3">TBD: Render Condition</div>
    </div>
  `,
})
export class WorkflowConditionComponent {
  @Input() node?: WorkflowItem
}

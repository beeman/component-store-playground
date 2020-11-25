import { Component, EventEmitter, Input, Output } from '@angular/core'
import { WorkflowItem } from '../../data-access/workflows/workflow-item'

@Component({
  selector: 'app-workflow-condition',
  template: `
    <div class="ml-6 border border-gray-400 mb-2">
      <h2 class="py-2 px-3 bg-gray-200 text-gray-900 flex justify-between">
        <div>Condition: {{ node?.id }}</div>
        <div *ngIf="node.parentId">
          <button (click)="deleteNode.emit(node)" class="text-gray-700">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </div>
      </h2>
      <div class="p-3">TBD: Render Condition</div>
    </div>
  `,
})
export class WorkflowConditionComponent {
  @Input() node?: WorkflowItem
  @Output() deleteNode = new EventEmitter<WorkflowItem>()
}

import { Component, Input } from '@angular/core'
import { WorkflowItem, WorkflowType } from '../../data-access/workflows/workflow-item'

@Component({
  selector: 'app-workflow-group',
  template: `
    <div class="ml-6 border border-gray-400">
      <h2 class="py-2 px-3 bg-gray-400 text-gray-900">Group: {{ node.id }}</h2>

      <div class="p-3">
        <ng-container *ngFor="let item of node.children">
          <ng-container *ngIf="item.type === type.condition">
            <app-workflow-condition [node]="item"></app-workflow-condition>
          </ng-container>
          <ng-container *ngIf="item.type === type.group">
            <app-workflow-group [node]="item"></app-workflow-group>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
})
export class WorkflowGroupComponent {
  @Input() node?: WorkflowItem
  type = WorkflowType
}

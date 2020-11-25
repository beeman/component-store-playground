import { Component, Input } from '@angular/core'
import { WorkflowItem, WorkflowType } from '../../data-access/workflows/workflow-item'
import { randomId } from '../../util/random-id'

@Component({
  selector: 'app-workflow-group',
  template: `
    <div class="ml-6 border border-gray-400 mb-3">
      <h2 class="py-2 px-2 bg-gray-400 text-gray-900">
        <button class="text-gray-700 mr-2" (click)="showChildren = !showChildren">
          <i class="fa fa-fw {{ showChildren ? 'fa-minus-circle' : 'fa-plus-circle' }}"></i>
        </button>
        Group: {{ node?.id }}
      </h2>

      <div class="p-3" [class.block]="showChildren" [class.hidden]="!showChildren">
        <ng-container *ngFor="let item of node?.children">
          <ng-container *ngIf="item.type === type.condition">
            <app-workflow-condition [node]="item"></app-workflow-condition>
          </ng-container>
          <ng-container *ngIf="item.type === type.group">
            <app-workflow-group [node]="item"></app-workflow-group>
          </ng-container>
        </ng-container>

        <div class="ml-6 mt-2">
          <button (click)="addGroup(node)" class="text-gray-600 bg-gray-200 px-2 py-1 mr-3">
            <i class="fa fa-fw fa-plus-circle"></i> Group
          </button>
          <button (click)="addCondition(node)" class="text-gray-600 bg-gray-200 px-2 py-1 mr-3">
            <i class="fa fa-fw fa-plus-circle"></i> Condition
          </button>
        </div>
      </div>
    </div>
  `,
})
export class WorkflowGroupComponent {
  @Input() node?: WorkflowItem
  showChildren = true
  type = WorkflowType

  addGroup(item: WorkflowItem): void {
    const existing = item?.children || []
    item.children = [...existing, { id: randomId(), type: WorkflowType.group, children: [] }]
  }

  addCondition(item: any): void {
    const existing = item?.children || []
    item.children = [...existing, { id: randomId(), type: WorkflowType.condition }]
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core'
import { WorkflowType } from '../../models/workflow-item'
import { WorkflowGroupStore } from './workflow-group.store'

@Component({
  selector: 'app-workflow-group',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="ml-6 border border-gray-400 mb-3">
        <h2 class="py-2 px-2 bg-gray-400 text-gray-900 flex justify-between">
          <div>
            <button class="text-gray-700 mr-2" (click)="toggleCollapse()">
              <i class="fa fa-fw {{ !vm.isCollapsed ? 'fa-minus-circle' : 'fa-plus-circle' }}"></i>
            </button>
            Group: {{ vm.group?.id }}
          </div>
          <div *ngIf="vm.isSubGroup">
            <button (click)="deleteGroup()" class="text-gray-700">
              <i class="fa fa-fw fa-trash"></i>
            </button>
          </div>
        </h2>

        <div class="p-3" [class.block]="!vm.isCollapsed" [class.hidden]="vm.isCollapsed">
          <ng-container *ngIf="vm.hasNoChildren">
            <div class="text-gray-700 ml-8 text-sm">No conditions or groups</div>
          </ng-container>
          <ng-container *ngFor="let item of vm.group?.children">
            <ng-container *ngIf="item.type === type.condition">
              <app-workflow-condition [conditionId]="item.id!"></app-workflow-condition>
            </ng-container>
            <ng-container *ngIf="item.type === type.group">
              <app-workflow-group [groupId]="item.id!" [level]="vm.nextLevel"></app-workflow-group>
            </ng-container>
          </ng-container>

          <div class="ml-6 mt-2">
            <button *ngIf="!vm.isAtMaxDepth" (click)="addGroup()" class="text-gray-600 bg-gray-200 px-2 py-1 mr-3">
              <i class="fa fa-fw fa-plus-circle"></i> Group
            </button>
            <button (click)="addCondition()" class="text-gray-600 bg-gray-200 px-2 py-1 mr-3">
              <i class="fa fa-fw fa-plus-circle"></i> Condition
            </button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowGroupStore],
})
export class WorkflowGroupComponent implements OnChanges {
  @Input() groupId!: string
  @Input() level!: number
  type = WorkflowType

  readonly vm$ = this.workflowGroupStore.vm$

  constructor(private readonly workflowGroupStore: WorkflowGroupStore) {}

  ngOnChanges(): void {
    this.workflowGroupStore.setGroup(this.groupId, this.level)
  }

  addGroup(): void {
    this.workflowGroupStore.addGroupEffect()
  }

  addCondition(): void {
    this.workflowGroupStore.addConditionEffect()
  }

  deleteGroup(): void {
    this.workflowGroupStore.removeEffect()
  }

  toggleCollapse(): void {
    this.workflowGroupStore.toggleCollapse()
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core'
import { WorkflowType } from '../../models/workflow-item'
import { WorkflowGroupStore } from './workflow-group.store'

@Component({
  selector: 'app-workflow-group',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="border border-gray-400 dark:border-gray-600 mb-3" [class.ml-6]="vm.isSubGroup">
        <h2
          class="py-2 px-2 dark:bg-gray-700 dark:text-gray-300 bg-gray-400 text-gray-900 dark:text-gray-100 flex justify-between"
        >
          <div class="flex items-center">
            <button class="text-gray-700 dark:text-gray-300 mr-2" (click)="toggleCollapse()">
              <ui-icon [icon]="vm.collapsedIcon"></ui-icon>
            </button>
            Group: {{ vm.group?.id }}
          </div>
          <div *ngIf="vm.isSubGroup">
            <button (click)="deleteGroup()" class="text-gray-700 dark:text-gray-300">
              <ui-icon icon="trash" size="sm"></ui-icon>
            </button>
          </div>
        </h2>

        <div class="p-3" [class.block]="!vm.isCollapsed" [class.hidden]="vm.isCollapsed">
          <ng-container *ngIf="vm.hasNoChildren">
            <div class="text-gray-700 dark:text-gray-300 ml-8 text-sm">No conditions or groups</div>
          </ng-container>
          <ng-container *ngFor="let item of vm.group?.children">
            <ng-container *ngIf="item.type === type.condition">
              <app-workflow-condition [conditionId]="item.id!"></app-workflow-condition>
            </ng-container>
            <ng-container *ngIf="item.type === type.group">
              <app-workflow-group [groupId]="item.id!" [level]="vm.nextLevel"></app-workflow-group>
            </ng-container>
          </ng-container>

          <div class="ml-6 mt-2 flex items-center space-x-2">
            <button
              *ngIf="!vm.isAtMaxDepth"
              (click)="addGroup()"
              class="text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 px-2 py-1 flex items-center space-x-2"
            >
              <ui-icon icon="plusCircle"></ui-icon>
              <span>Group</span>
            </button>
            <button
              (click)="addCondition()"
              class="text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 px-2 py-1 flex items-center space-x-2"
            >
              <ui-icon icon="plusCircle"></ui-icon>
              <span>Condition</span>
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

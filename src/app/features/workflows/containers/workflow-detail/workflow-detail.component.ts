import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Workflow } from '../../models/workflow'
import { WorkflowDetailStore } from './workflow-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <app-page>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden py-4 px-6">
          <div class="flex-grow flex justify-between">
            <h3 class="font-normal px-2 py-3 leading-tight">{{ vm.workflow?.name }}</h3>
            <button
              class="bg-green-400 hover:bg-green-500 text-white py-1 px-2 rounded"
              (click)="saveWorkflow(vm.workflow)"
            >
              Save
            </button>
          </div>
          <div class="w-full mt-6">
            <app-loading [loading]="vm.loading"></app-loading>

            <ng-container *ngIf="!vm.workflow?.group"> No workflow group!</ng-container>
            <ng-container *ngIf="vm.workflow?.group">
              <app-workflow-group [groupId]="vm.root || ''" [level]="0"></app-workflow-group>
            </ng-container>
          </div>
        </div>
      </app-page>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowDetailStore],
})
export class WorkflowDetailComponent {
  readonly vm$ = this.workflowDetailStore.vm$

  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {}

  saveWorkflow(workflow?: Workflow): void {
    // this.service.updateWorkflow(workflow).subscribe()
  }
}

import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, tap } from 'rxjs/operators'
import { Workflow } from '../../models/workflow'
import { WorkflowsService } from '../../workflows.service'

@Component({
  template: `
    <app-page>
      <div class="bg-white shadow-lg rounded-lg overflow-hidden py-4 px-6">
        <ng-container *ngIf="workflow$ | async as workflow">
          <div class="flex-grow flex justify-between">
            <h3 class="font-normal px-2 py-3 leading-tight">{{ workflow.name }}</h3>
            <button
              class="bg-green-400 hover:bg-green-500 text-white py-1 px-2 rounded"
              (click)="saveWorkflow(workflow)"
            >
              Save
            </button>
          </div>
          <div class="w-full mt-6">
            <app-loading [loading]="loading"></app-loading>

            <ng-container *ngIf="!workflow.group"> No workflow group! </ng-container>
            <ng-container *ngIf="workflow.group">
              <app-workflow-group [node]="workflow.group"></app-workflow-group>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </app-page>
  `,
})
export class WorkflowDetailComponent {
  id$ = this.route.paramMap.pipe(map((param) => param.get('workflowId')))
  workflow$ = this.id$.pipe(
    // @ts-ignore
    switchMap((id: string) => this.service.item(id)),
    tap(() => (this.loading = false)),
  )

  saving = false
  loading = true
  constructor(private readonly service: WorkflowsService, private readonly route: ActivatedRoute) {}
  saveWorkflow(workflow: Workflow): void {
    this.service.update(workflow.id!, workflow).subscribe()
  }
}

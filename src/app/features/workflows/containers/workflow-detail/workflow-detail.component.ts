import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, tap } from 'rxjs/operators'
import { Workflow } from '../../models/workflow'
import { WorkflowsService } from '../../workflows.service'

@Component({
  template: `
    <app-page>
      <ng-container *ngIf="workflow$ | async as workflow">
        <div class="flex-grow">
          <div class="p-2 flex justify-between">
            <div>
              <h3 class="font-normal px-2 py-1 leading-tight">
                {{ workflow.name }}
              </h3>
            </div>
            <div>
              <button
                class="bg-green-400 hover:bg-green-500 text-white py-1 px-2 rounded"
                (click)="saveWorkflow(workflow)"
              >
                Save
              </button>
            </div>
          </div>
          <div class="w-full">
            <app-loading [loading]="loading"></app-loading>

            <ng-container *ngIf="!workflow.group"> No workflow group! </ng-container>
            <ng-container *ngIf="workflow.group">
              <app-workflow-group [node]="workflow.group"></app-workflow-group>
            </ng-container>
          </div>
        </div>
      </ng-container>
    </app-page>
  `,
})
export class WorkflowDetailComponent {
  id$ = this.route.paramMap.pipe(map((param) => param.get('workflowId')))
  workflow$ = this.id$.pipe(
    // @ts-ignore
    switchMap((id: string) => this.service.workflow$(id)),
    tap(() => (this.loading = false)),
  )

  saving = false
  loading = true
  constructor(private readonly service: WorkflowsService, private readonly route: ActivatedRoute) {}
  saveWorkflow(workflow: Workflow): void {
    this.service.updateWorkflow(workflow).subscribe()
  }
}

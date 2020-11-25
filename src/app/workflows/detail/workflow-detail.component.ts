import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { Workflow } from '../../data-access/workflows/workflow'
import { WorkflowsDataAccessService } from '../../data-access/workflows/workflows-data-access.service'

@Component({
  template: `
    <app-page>
      <ng-container *ngIf="workflow$ | async as workflow">
        <div class="flex-grow">
          <h3 class="font-normal px-2 py-3 leading-tight">{{ workflow.name }}</h3>
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
  constructor(private readonly service: WorkflowsDataAccessService, private readonly route: ActivatedRoute) {}
}

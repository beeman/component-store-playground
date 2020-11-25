import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { Workflow } from '../../data-access/workflows/workflow'
import { WorkflowsDataAccessService } from '../../data-access/workflows/workflows-data-access.service'

@Component({
  template: `
    <app-page>
      <div class="md:w-full">
        <div class=" p-4 bg-grey-lighter py-8">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="sm:flex sm:items-center px-2 py-4">
              <ng-container *ngIf="workflow$ | async as workflow">
                <div class="flex-grow">
                  <h3 class="font-normal px-2 py-3 leading-tight">{{ workflow.name }}</h3>
                  <div class="w-full">
                    <app-loading [loading]="loading"></app-loading>

                    <ng-container *ngIf="workflow.items as items">
                      <ng-container *ngFor="let item of items">
                        <app-workflow-group [node]="item"></app-workflow-group>
                      </ng-container>
                    </ng-container>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
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

  workflows$ = this.service.workflows$.pipe(tap(() => (this.loading = false)))
  saving = false
  loading = true
  constructor(private readonly service: WorkflowsDataAccessService, private readonly route: ActivatedRoute) {
    // this.service.addWorkflow({ email: 'beeman@beeman.nl', name: 'beeman' })
  }

  public addWorkflow(): void {
    this.saving = true
    this.service.addWorkflow({ name: 'Untitled Workflow', items: [] }).subscribe(() => {
      this.saving = false
    })
  }

  public deleteWorkflow(workflow: Workflow): void {
    this.service.deleteWorkflow(workflow).subscribe()
  }

  public toggleWorkflow(workflow: Workflow): void {
    console.log('toggle')
    // this.service.toggleWorkflow(workflow).subscribe()
  }
}

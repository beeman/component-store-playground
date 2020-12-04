import { Component } from '@angular/core'
import { tap } from 'rxjs/operators'
import { Workflow } from '../../models/workflow'
import { WorkflowType } from '../../models/workflow-item'
import { randomId } from '../../../../util/random-id'
import { WorkflowsService } from '../../workflows.service'

@Component({
  template: `
    <app-page>
      <div class="md:w-full">
        <div class=" p-4 bg-grey-lighter py-8">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="sm:flex sm:items-center px-2 py-4">
              <div class="flex-grow">
                <h3 class="font-normal px-2 py-3 leading-tight">Workflows</h3>
                <div class="w-full">
                  <app-loading [loading]="loading"></app-loading>

                  <ng-container *ngIf="workflows$ | async as workflows">
                    <ng-container *ngIf="!workflows.length">
                      <div
                        class="flex items-center justify-center bg-gray-100  text-sm font-bold  p-16  rounded"
                        role="alert"
                      >
                        <p>There are no workflows.</p>
                      </div>
                    </ng-container>
                    <ng-container *ngFor="let workflow of workflows">
                      <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                        <div class="py-3">
                          <button class="text-red-600" (click)="deleteWorkflow(workflow)">
                            <i class="fa fa-trash"></i>
                          </button>
                        </div>
                        <div class="h-10 py-3 px-1">
                          <a class="hover:text-blue-dark" [routerLink]="workflow.id">
                            {{ workflow.name }}
                          </a>
                        </div>
                      </div>
                    </ng-container>
                  </ng-container>
                  <div
                    class="flex cursor-pointer p-1 bg-gray-100 hover:bg-blue-lightest animate-pulse rounded"
                    *ngIf="saving"
                  >
                    Saving...
                  </div>
                </div>
                <div class="sm:flex bg-grey-light sm:items-center px-2 py-4">
                  <div class="flex-grow text-right">
                    <button
                      class="bg-green-400 hover:bg-blue-dark text-white py-2 px-4 rounded"
                      (click)="addWorkflow()"
                    >
                      Add Workflow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-page>
  `,
})
export class WorkflowListComponent {
  workflows$ = this.service.workflows$.pipe(tap(() => (this.loading = false)))
  saving = false
  loading = true
  constructor(private readonly service: WorkflowsService) {}

  public addWorkflow(): void {
    this.saving = true
    this.service
      .addWorkflow({
        name: `Untitled Workflow ${randomId()}`,
        group: {
          id: randomId(),
          type: WorkflowType.group,
          children: [],
        },
      })
      .subscribe(() => {
        this.saving = false
      })
  }

  public deleteWorkflow(workflow: Workflow): void {
    this.service.deleteWorkflow(workflow).subscribe()
  }
}

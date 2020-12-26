import { Injectable } from '@angular/core'
import { ApiResponse } from '@component-store-playground/playground/shared/utils/types'
import { Workflow, WorkflowGroup, WorkflowsService } from '@component-store-playground/playground/workflows/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { immerReducer } from 'ngrx-immer'
import { mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators'

interface WorkflowListState {
  workflows: ApiResponse<Workflow[]>
  saving: boolean
}

@Injectable()
export class WorkflowListStore extends ComponentStore<WorkflowListState> {
  constructor(private readonly service: WorkflowsService) {
    super({
      workflows: { data: [], error: '', status: 'idle' },
      saving: false,
    })
  }

  readonly workflows$ = this.select((s) => s.workflows)
  readonly saving$ = this.select((s) => s.saving)

  readonly vm$ = this.select(this.workflows$, this.saving$, ({ data, error, status }, saving) => ({
    workflows: data,
    saving,
    isLoading: status === 'loading' && !data?.length,
    isEmpty: status === 'success' && !data?.length,
  }))

  readonly updateWorkflows = this.updater<ApiResponse<Workflow[]>>(
    immerReducer((state, value) => {
      state.workflows = value
      state.saving = false
    }),
  )

  // loadWorkflows
  readonly loadWorkflowsEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.workflows$),
      switchMap(([, { data = [] }]) =>
        this.service.items(data!).pipe(
          tapResponse((workflows: ApiResponse<Workflow[]>) => {
            this.updateWorkflows(workflows)
          }, console.error),
        ),
      ),
    ),
  )

  readonly addWorkflowEffect = this.effect<{ name: string; group: WorkflowGroup }>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ saving: true })),
      mergeMap((input) => this.service.create(input).pipe(this.reload)),
    ),
  )

  readonly deleteWorkflowEffect = this.effect<Workflow>((workflow$) =>
    workflow$.pipe(mergeMap((workflow) => this.service.delete(workflow.id!).pipe(this.reload))),
  )

  private reload = tapResponse(() => this.loadWorkflowsEffect(), console.error)
}

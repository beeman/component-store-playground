import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { mergeMap, switchMapTo, tap } from 'rxjs/operators'
import { Workflow } from '../../models/workflow'
import { WorkflowItem } from '../../models/workflow-item'
import { WorkflowsService } from '../../workflows.service'

interface WorkflowListState {
  workflows: Workflow[]
  saving: boolean
  loading: boolean
}

@Injectable()
export class WorkflowListStore extends ComponentStore<WorkflowListState> {
  constructor(private readonly service: WorkflowsService) {
    super({
      workflows: [],
      saving: false,
      loading: false,
    })
  }

  readonly workflows$ = this.select((s) => s.workflows)
  readonly saving$ = this.select((s) => s.saving)
  readonly loading$ = this.select((s) => s.loading)

  readonly vm$ = this.select(this.workflows$, this.saving$, this.loading$, (workflows, saving, loading) => ({
    workflows,
    saving,
    isLoading: loading && !workflows.length,
    isEmpty: !loading && !workflows.length,
  }))

  // loadWorkflows
  readonly loadWorkflowsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.setState((state) => ({ ...state, loading: true }))),
      switchMapTo(
        this.service.items().pipe(
          tap((workflows) => {
            this.setState({ workflows, loading: false, saving: false })
          }),
        ),
      ),
    ),
  )

  readonly addWorkflowEffect = this.effect<{ name: string; group: WorkflowItem }>((input$) =>
    input$.pipe(
      tap(() => this.setState((state) => ({ ...state, saving: true }))),
      mergeMap((input) => this.service.create(input).pipe(this.reload)),
    ),
  )

  readonly deleteWorkflowEffect = this.effect<Workflow>((workflow$) =>
    workflow$.pipe(mergeMap((workflow) => this.service.delete(workflow.id!).pipe(this.reload))),
  )

  private reload = tap(() => this.loadWorkflowsEffect())
}

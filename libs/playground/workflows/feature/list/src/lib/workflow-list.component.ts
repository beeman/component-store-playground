import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Workflow, WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { randomId } from '@component-store-playground/playground/workflows/util'
import { WorkflowListStore } from './stores'

@Component({
  selector: 'playground-workflow-list',
  templateUrl: './workflow-list.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowListStore],
})
export class WorkflowListComponent implements OnInit {
  readonly vm$ = this.workflowListStore.vm$

  constructor(private readonly workflowListStore: WorkflowListStore) {}

  ngOnInit(): void {
    this.workflowListStore.loadWorkflowsEffect()
  }

  addWorkflow(task: HTMLInputElement): void {
    this.workflowListStore.addWorkflowEffect({
      name: task.value,
      group: {
        id: randomId(),
        type: WorkflowType.group,
        children: [],
      },
    })
    task.value = ''
  }

  deleteWorkflow($event: MouseEvent, workflow: Workflow): void {
    $event.stopPropagation()
    this.workflowListStore.deleteWorkflowEffect(workflow)
  }
}

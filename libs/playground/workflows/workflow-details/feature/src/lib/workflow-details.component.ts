import { ChangeDetectionStrategy, Component } from '@angular/core'
import { WorkflowDetailStore } from '@component-store-playground/playground/workflows/workflow-details/data-access'

@Component({
  selector: 'playground-workflow-details',
  templateUrl: './workflow-details.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowDetailStore],
})
export class WorkflowDetailsComponent {
  readonly vm$ = this.workflowDetailStore.vm$

  constructor(private readonly workflowDetailStore: WorkflowDetailStore) {}

  saveWorkflow(): void {
    this.workflowDetailStore.saveWorkflowEffect()
  }
}

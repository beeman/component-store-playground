import { ChangeDetectionStrategy, Component } from '@angular/core'
import { WorkflowDetailsStore } from './stores'

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
  providers: [WorkflowDetailsStore],
})
export class WorkflowDetailsComponent {
  readonly vm$ = this.workflowDetailStore.vm$

  constructor(private readonly workflowDetailStore: WorkflowDetailsStore) {}

  saveWorkflow(): void {
    this.workflowDetailStore.saveWorkflowEffect()
  }
}

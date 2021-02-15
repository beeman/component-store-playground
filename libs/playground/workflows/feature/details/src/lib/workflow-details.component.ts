import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormField } from '@component-store-playground/shared/ui/forms'
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
  readonly form = new FormGroup({})
  readonly fields = [
    FormField.fieldRow(
      [
        FormField.input('workflowName', { label: 'Workflow Name' }, { className: 'col-span-3' }),
        FormField.number(
          'maxDepth',
          { label: 'Max Depth' },
          {
            expressionProperties: {
              'templateOptions.min': 'model.currentMaxLevel',
            },
          },
        ),
      ],
      'grid grid-cols-4 gap-4',
    ),
  ]

  constructor(private readonly workflowDetailStore: WorkflowDetailsStore) {}

  saveWorkflow(): void {
    this.workflowDetailStore.saveWorkflowEffect({
      workflowName: this.form.value.workflowName,
      maxDepth: Number(this.form.value.maxDepth),
    })
  }
}

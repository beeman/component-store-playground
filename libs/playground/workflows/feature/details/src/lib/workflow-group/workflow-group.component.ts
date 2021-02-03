import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { WorkflowType } from '@component-store-playground/playground/workflows/data-access'
import { WorkflowGroupStore } from '../stores'

@Component({
  selector: 'playground-workflow-group',
  templateUrl: './workflow-group.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowGroupStore],
})
export class WorkflowGroupComponent implements OnInit {
  @Input() groupId!: string
  @Input() level = 0
  type = WorkflowType

  readonly vm$ = this.workflowGroupStore.vm$

  constructor(private readonly workflowGroupStore: WorkflowGroupStore) {}

  ngOnInit(): void {
    this.workflowGroupStore.setGroup(this.groupId, this.level)
  }

  addGroup(): void {
    this.workflowGroupStore.addGroupEffect()
  }

  addCondition(): void {
    this.workflowGroupStore.addConditionEffect()
  }

  deleteGroup(): void {
    this.workflowGroupStore.removeEffect()
  }

  toggleCollapse(): void {
    this.workflowGroupStore.toggleCollapse()
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { WorkflowConditionStore } from '../stores'

@Component({
  selector: 'playground-workflow-condition',
  templateUrl: './workflow-condition.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowConditionStore],
})
export class WorkflowConditionComponent implements OnInit {
  @Input() conditionId!: string

  allowDeleteControl = new FormControl()

  readonly vm$ = this.workflowConditionStore.vm$.pipe(
    tap(({ condition }) => {
      this.setupAllowDeleteControl(condition?.value!)
    }),
  )

  constructor(private readonly workflowConditionStore: WorkflowConditionStore) {}

  ngOnInit(): void {
    this.workflowConditionStore.setConditionId(this.conditionId)
    this.workflowConditionStore.updateConditionEffect(this.allowDeleteControl.valueChanges)
  }

  deleteCondition(): void {
    this.workflowConditionStore.deleteConditionEffect()
  }

  private setupAllowDeleteControl(currentValue: boolean): void {
    if (this.allowDeleteControl.value == null) {
      this.allowDeleteControl.setValue(currentValue, { onlySelf: true, emitEvent: false })
    }
  }
}

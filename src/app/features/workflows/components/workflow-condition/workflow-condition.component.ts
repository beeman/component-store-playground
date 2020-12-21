import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { WorkflowConditionStore } from './workflow-condition.store'

@Component({
  selector: 'app-workflow-condition',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="ml-6 border border-gray-400 dark:border-gray-600 mb-2">
        <h2
          class="py-2 px-3 dark:bg-gray-600 dark:text-gray-300 bg-gray-200 text-gray-900 dark:text-gray-100 flex justify-between items-center"
        >
          <div>Condition: {{ vm.condition?.id }}</div>
          <button *ngIf="vm.condition?.value" (click)="deleteCondition()" class="text-gray-700 dark:text-gray-300">
            <ui-icon icon="trash" size="sm"></ui-icon>
          </button>
        </h2>
        <div class="p-3">
          <label [for]="'allowDeleteControl' + conditionId">
            <input type="checkbox" [id]="'allowDeleteControl' + conditionId" [formControl]="allowDeleteControl" />
            Allow delete this condition
          </label>
        </div>
      </div>
    </ng-container>
  `,
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

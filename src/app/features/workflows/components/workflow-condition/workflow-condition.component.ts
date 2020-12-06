import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { WorkflowConditionStore } from './workflow-condition.store'

@Component({
  selector: 'app-workflow-condition',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="ml-6 border border-gray-400 mb-2">
        <h2 class="py-2 px-3 bg-gray-200 text-gray-900 flex justify-between">
          <div>Condition: {{ vm.id }}</div>
          <button *ngIf="vm.value" (click)="removeCondition()" class="text-gray-700">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </h2>
        <div class="p-3">
          <label [for]="'allowDelete' + vm.id">
            <input [id]="'allowDelete' + vm.id" type="checkbox" [formControl]="allowDeleteControl" />
            Allow deleting this condition?
          </label>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowConditionStore],
})
export class WorkflowConditionComponent implements OnInit {
  @Input() conditionId?: string

  allowDeleteControl = new FormControl()

  readonly vm$ = this.workflowConditionStore.vm$.pipe(
    tap((vm) => {
      this.setupAllowDeleteControl(vm?.value as boolean)
    }),
  )

  constructor(private readonly workflowConditionStore: WorkflowConditionStore) {}

  ngOnInit(): void {
    this.workflowConditionStore.setCondition(this.conditionId as string)
    this.workflowConditionStore.updateConditionEffect(this.allowDeleteControl.valueChanges)
  }

  removeCondition(): void {
    this.workflowConditionStore.removeConditionEffect()
  }

  private setupAllowDeleteControl(currentValue: boolean): void {
    if (this.allowDeleteControl.value == null) {
      this.allowDeleteControl.setValue(currentValue, { onlySelf: true, emitEvent: false })
    }
  }
}

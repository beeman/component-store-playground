import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormsDemoListStore } from './stores'

@Component({
  selector: 'playground-forms-demo-list',
  templateUrl: './forms-demo-list.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormsDemoListStore],
})
export class FormsDemoListComponent implements OnInit {
  vm$ = this.formsDemoStore.vm$

  constructor(private readonly formsDemoStore: FormsDemoListStore) {}

  ngOnInit(): void {
    this.formsDemoStore.loadDemosEffect()
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormsDemoDetailStore } from './stores'

@Component({
  selector: 'playground-forms-demo-detail',
  templateUrl: './forms-demo-detail.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormsDemoDetailStore],
})
export class FormsDemoDetailComponent {
  vm$ = this.formsDemoStore.vm$

  constructor(private readonly formsDemoStore: FormsDemoDetailStore) {}
}

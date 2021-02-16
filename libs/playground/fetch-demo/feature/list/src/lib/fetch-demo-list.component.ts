import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import type { NavItem } from '@component-store-playground/shared/data-access/models'

@Component({
  selector: 'playground-fetch-demo-list',
  templateUrl: './fetch-demo-list.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchDemoListComponent implements OnInit {
  navItems: NavItem[] = [{ label: 'Pagination w/ Client Filter', path: 'client-filter' }]

  constructor() {}

  ngOnInit(): void {}
}

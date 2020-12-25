import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

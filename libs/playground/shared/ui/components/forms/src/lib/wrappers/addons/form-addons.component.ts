import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  templateUrl: './form-addons.component.html',
  styleUrls: ['./form-addons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddonsComponent extends FieldWrapper {
  addonRightClick($event: any): void {
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event)
    }
  }

  addonLeftClick($event: any): void {
    if (this.to.addonLeft.onClick) {
      this.to.addonLeft.onClick(this.to, this, $event)
    }
  }
}

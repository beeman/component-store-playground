import { NgModule } from '@angular/core'
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon'
import { uiIconSets } from './ui-icon-sets'
import { UiIconComponent } from './ui-icon.component'

@NgModule({
  imports: [AngularSvgIconModule.forRoot()],
  declarations: [UiIconComponent],
  exports: [UiIconComponent],
})
export class UiIconModule {
  constructor(private readonly iconReg: SvgIconRegistryService) {
    uiIconSets.forEach((svg, name) => this.iconReg.addSvg(name, svg))
  }
}

import { NgModule } from '@angular/core'
import { SvgIconRegistry, SvgIconsModule } from '@ngneat/svg-icon'
import { uiIconSets } from './ui-icon-sets'
import { UiIconComponent } from './ui-icon.component'

@NgModule({
  imports: [SvgIconsModule.forRoot()],
  declarations: [UiIconComponent],
  exports: [UiIconComponent],
})
export class UiIconModule {
  constructor(private readonly registry: SvgIconRegistry) {
    uiIconSets.forEach((data, name) => this.registry.register({ name, data }))
  }
}

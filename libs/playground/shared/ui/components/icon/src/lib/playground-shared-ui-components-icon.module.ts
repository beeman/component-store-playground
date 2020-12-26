import { NgModule } from '@angular/core'
import { uiIconMap } from '@component-store-playground/playground/shared/ui/util'
import { SvgIconRegistry, SvgIconsModule } from '@ngneat/svg-icon'
import { IconComponent } from './icon.component'

@NgModule({
  imports: [SvgIconsModule.forRoot()],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class PlaygroundSharedUiComponentsIconModule {
  constructor(readonly registry: SvgIconRegistry) {
    uiIconMap.forEach((data, name) => this.registry.register({ name, data }))
  }
}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormStepperModule } from '@component-store-playground/playground/wizard/ui'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { PlaygroundWizardFeatureComponent } from './playground-wizard-feature.component'

@NgModule({
  declarations: [PlaygroundWizardFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlaygroundWizardFeatureComponent }]),
    SharedUiFormsModule,
    FormStepperModule,
    SharedUiPageModule,
  ],
})
export class PlaygroundWizardFeatureModule {}

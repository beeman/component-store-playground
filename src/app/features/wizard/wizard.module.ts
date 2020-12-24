import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiFormModule } from '../../ui/form/ui-form.module'
import { UiStepperModule } from '../../ui/stepper/ui-stepper.module'
import { WizardComponent } from './wizard.component'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'

@NgModule({
  declarations: [WizardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WizardComponent }]),
    UiModule,
    UiFormModule,
    UiStepperModule,
  ],
})
export class WizardModule {}

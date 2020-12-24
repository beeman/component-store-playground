import { CdkStepperModule } from '@angular/cdk/stepper'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiStepComponent } from './ui-step.component'
import { UiStepperComponent } from './ui-stepper.component'

@NgModule({
  declarations: [UiStepperComponent, UiStepComponent],
  exports: [UiStepperComponent, UiStepComponent, CdkStepperModule],
  imports: [CommonModule, CdkStepperModule],
})
export class UiStepperModule {}

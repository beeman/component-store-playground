import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiFormsModule } from '@component-store-playground/shared/ui/forms'
import { FormsDemoDetailComponent } from './forms-demo-detail.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormsDemoDetailComponent }]),
    SharedUiFormsModule,
  ],
  declarations: [FormsDemoDetailComponent],
})
export class PlaygroundFormsDemoFeatureDetailsModule {}

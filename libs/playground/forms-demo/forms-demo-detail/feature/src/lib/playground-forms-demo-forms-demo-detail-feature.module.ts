import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedUiComponentsFormsModule } from '@component-store-playground/playground/shared/ui/components/forms'
import { FormsDemoDetailComponent } from './forms-demo-detail.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormsDemoDetailComponent }]),
    PlaygroundSharedUiComponentsFormsModule,
  ],
  declarations: [FormsDemoDetailComponent],
})
export class PlaygroundFormsDemoFormsDemoDetailFeatureModule {}

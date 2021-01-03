import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { DashboardWidgetGridModule } from '@component-store-playground/playground/dashboard/ui'
import { SharedUiPageModule } from '@component-store-playground/shared/ui/page'
import { PlaygroundDashboardFeatureComponent } from './playground-dashboard-feature.component'

@NgModule({
  declarations: [PlaygroundDashboardFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlaygroundDashboardFeatureComponent }]),
    SharedUiPageModule,
    DashboardWidgetGridModule,
  ],
})
export class PlaygroundDashboardFeatureModule {}

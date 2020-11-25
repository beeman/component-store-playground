import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkflowsDataAccessModule } from '../data-access/workflows/workflows-data-access.module'
import { UiModule } from '../ui/ui.module'
import { WorkflowConditionComponent } from './condition/workflow-condition.component'

import { WorkflowDetailComponent } from './detail/workflow-detail.component'
import { WorkflowGroupComponent } from './group/workflow-group.component'
import { WorkflowListComponent } from './list/workflow-list.component'

import { WorkflowsRoutingModule } from './workflows-routing.module'

@NgModule({
  declarations: [WorkflowListComponent, WorkflowDetailComponent, WorkflowGroupComponent, WorkflowConditionComponent],
  imports: [CommonModule, WorkflowsRoutingModule, WorkflowsDataAccessModule, UiModule],
})
export class WorkflowsModule {}

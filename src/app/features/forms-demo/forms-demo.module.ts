import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiFormModule } from '../../ui/form/ui-form.module'
import { FormsDemoDetailComponent } from './forms-demo-detail/forms-demo-detail.component'
import { FormsDemoListComponent } from './forms-demo-list/forms-demo-list.component'
import { RouterModule } from '@angular/router'
import { UiModule } from '../../ui/ui.module'

@NgModule({
  declarations: [FormsDemoListComponent, FormsDemoDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormsDemoListComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'field-types' },
          { path: ':id', component: FormsDemoDetailComponent },
        ],
      },
    ]),
    UiModule,
    UiFormModule,
  ],
})
export class FormsDemoModule {}

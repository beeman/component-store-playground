import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from './ui/layout/layout.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'todos' },
      {
        path: 'todos',
        loadChildren: () => import('./todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'workflows',
        loadChildren: () => import('./workflows/workflows.module').then((m) => m.WorkflowsModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

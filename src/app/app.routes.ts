import { Routes } from '@angular/router'
import { LayoutComponent } from './ui/layout/layout.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'todos',
        loadChildren: () => import('./features/todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'workflows',
        loadChildren: () => import('./features/workflows/workflows.module').then((m) => m.WorkflowsModule),
      },
    ],
  },
]

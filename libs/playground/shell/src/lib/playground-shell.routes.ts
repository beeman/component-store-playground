import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'

export const playgroundShellRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'todos',
        loadChildren: () =>
          import('@component-store-playground/playground/todos/feature').then((m) => m.PlaygroundTodosFeatureModule),
      },
    ],
  },
]

/**
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
        path: 'forms',
        loadChildren: () => import('./features/forms-demo/forms-demo.module').then((m) => m.FormsDemoModule),
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
  }
 */

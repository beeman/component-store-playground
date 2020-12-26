import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'

export const playgroundShellRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('@component-store-playground/playground/home/feature').then((m) => m.PlaygroundHomeFeatureModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@component-store-playground/playground/auth/feature').then((m) => m.PlaygroundAuthFeatureModule),
      },
      {
        path: 'todos',
        loadChildren: () =>
          import('@component-store-playground/playground/todos/feature').then((m) => m.PlaygroundTodosFeatureModule),
      },
      {
        path: 'workflows',
        loadChildren: () =>
          import('@component-store-playground/playground/workflows/feature').then(
            (m) => m.PlaygroundWorkflowsFeatureModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('@component-store-playground/playground/forms-demo/feature').then(
            (m) => m.PlaygroundFormsDemoFeatureModule,
          ),
      },
    ],
  },
]

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedDataAccessIdbModule } from '@component-store-playground/shared/data-access/idb'
import { SharedUiFooterModule } from '@component-store-playground/shared/ui/footer'
import { SharedUiHeaderModule } from '@component-store-playground/shared/ui/header'
import { LayoutComponent } from './layout/layout.component'
import { playgroundShellRoutes } from './playground-shell.routes'

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessIdbModule,
    RouterModule.forRoot(playgroundShellRoutes),
    SharedUiHeaderModule,
    SharedUiFooterModule,
  ],
  declarations: [LayoutComponent],
  exports: [RouterModule],
})
export class PlaygroundShellModule {}

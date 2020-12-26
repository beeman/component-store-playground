import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaygroundSharedIdbDataAccessModule } from '@component-store-playground/playground/shared/idb/data-access'
import { PlaygroundSharedUiComponentsFooterModule } from '@component-store-playground/playground/shared/ui/components/footer'
import { PlaygroundSharedUiComponentsHeaderModule } from '@component-store-playground/playground/shared/ui/components/header'
import { LayoutComponent } from './layout/layout.component'
import { playgroundShellRoutes } from './playground-shell.routes'

@NgModule({
  imports: [
    CommonModule,
    PlaygroundSharedIdbDataAccessModule,
    RouterModule.forRoot(playgroundShellRoutes),
    PlaygroundSharedUiComponentsHeaderModule,
    PlaygroundSharedUiComponentsFooterModule,
  ],
  declarations: [LayoutComponent],
  exports: [RouterModule],
})
export class PlaygroundShellModule {}

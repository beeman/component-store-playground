import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { PlaygroundShellModule } from '@component-store-playground/playground/shell'
import { SharedUtilComponentStoreDevtoolsModule } from '@component-store-playground/shared/util/component-store-devtools'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedUtilComponentStoreDevtoolsModule.forRoot(!environment.production),
    PlaygroundShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

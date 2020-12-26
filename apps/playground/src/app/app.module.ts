import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { PlaygroundShellModule } from '@component-store-playground/playground/shell'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PlaygroundShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

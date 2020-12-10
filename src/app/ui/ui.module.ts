import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiFormModule } from './form/ui-form.module'
import { LayoutComponent } from './layout/layout.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { RouterModule } from '@angular/router'
import { PageComponent } from './page/page.component'
import { LoadingComponent } from './loading/loading.component'
import { UiIconModule } from './icon/ui-icon.module'

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, PageComponent, LoadingComponent],
  imports: [CommonModule, RouterModule, UiFormModule, UiIconModule],
  exports: [PageComponent, LoadingComponent],
})
export class UiModule {}

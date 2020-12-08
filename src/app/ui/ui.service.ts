import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UiService {
  readonly theme = new BehaviorSubject<'dark' | 'light'>('dark')
  readonly theme$ = this.theme.asObservable()

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleDarkMode(): void {
    const body = this.document?.getElementsByTagName('body').item(0)
    if (body) {
      if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light')
        this.theme.next('light')
      } else {
        body.classList.replace('light', 'dark')
        this.theme.next('dark')
      }
    }
  }
}

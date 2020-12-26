import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'playground-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

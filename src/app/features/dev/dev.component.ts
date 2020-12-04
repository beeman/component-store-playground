import { Component } from '@angular/core'
import { BlitzerService } from 'blitzer'

@Component({
  selector: 'app-home',
  template: `
    <app-page>
      <div class="flex flex-col">
        <div>
          <button class="rounded px-4 p-2 bg-blue-700 text-blue-200  hover:bg-blue-800" (click)="test()">Test</button>
        </div>
      </div>
    </app-page>
  `,
})
export class DevComponent {
  constructor(private readonly blitzer: BlitzerService) {}

  test(): void {
    const form = this.blitzer.constructStackblitzForm('bootstrap', {
      debug: true,
      title: 'Test Blitzer ',
      description: 'This is my Test',
      files: [
        {
          file: 'app.component.ts',
          content: require('!!raw-loader!../home/home.component').default,
        },
        {
          file: 'app.module.ts',
          content: require('!!raw-loader!../home/home.module.ts').default,
        },
      ],
      deps: [],
      component: '',
    })
    //
    // console.log('form', form)
    // form.submit()
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }
}

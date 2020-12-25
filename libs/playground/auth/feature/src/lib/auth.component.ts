import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'playground-auth',
  templateUrl: './auth.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  model = {
    email: '',
    password: '',
    'ui-language': 'en',
    'other-languages': ['en'],
  }
  form = new FormGroup({})
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        required: false,
      },
    },
    {
      key: 'password',
      type: 'password',
      templateOptions: {
        label: 'Password',
        required: false,
      },
    },
    {
      key: 'bio',
      type: 'textarea',
      templateOptions: {
        label: 'You biography',
        required: false,
        rows: 5,
      },
    },
    {
      key: 'ui-language',
      type: 'select',
      templateOptions: {
        label: 'Language for the UI',
        required: false,
        options: [
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
        ],
      },
    },

    {
      key: 'other-languages',
      type: 'select',
      templateOptions: {
        label: 'Other languages',
        required: false,
        multiple: true,
        options: [
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
        ],
      },
    },
  ]

  submit(value: any): void {
    console.log(value)
  }
}

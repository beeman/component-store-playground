import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  template: `
    <app-page>
      <div class="bg-white p-6 rounded shadow m-6">
        <ui-form [form]="form" [fields]="fields" [model]="model"></ui-form>
        <div class="flex justify-between">
          <a
            routerLink="/register"
            type="button"
            class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-600 border-purple-600 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Register
          </a>
          <button
            [disabled]="!form.valid"
            (click)="submit(form.value)"
            type="button"
            class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </button>
        </div>
        <pre>{{ model | json }}</pre>
      </div>
    </app-page>
  `,
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

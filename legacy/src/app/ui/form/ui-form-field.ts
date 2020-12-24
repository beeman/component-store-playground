import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core'

export class UiFormField implements FormlyFieldConfig {
  static checkbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.field(key, 'checkbox', templateOptions, options)
  }

  static date(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.input(key, { ...templateOptions, type: 'date' }, { ...options })
  }

  static datetime(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.input(key, { ...templateOptions, type: 'datetime-local' }, { ...options })
  }

  static email(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
    }
    const defaultOptions = { validators: { validation: ['email'] } }

    return UiFormField.input(key, { ...defaults, ...templateOptions }, { ...defaultOptions, ...options })
  }

  static fieldRow(fieldGroup: FormlyFieldConfig[] = [], fieldGroupClassName: string = 'flex'): FormlyFieldConfig {
    return {
      fieldGroup,
      fieldGroupClassName,
    }
  }

  static field(
    key: string,
    type?: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return {
      key,
      type,
      templateOptions: {
        ...templateOptions,
      },
      ...config,
    }
  }

  static input(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return UiFormField.field(key, 'input', templateOptions, config)
  }

  static multicheckbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.field(key, 'multicheckbox', templateOptions, options)
  }

  static number(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.input(key, { ...templateOptions, type: 'number' }, { ...options })
  }

  static password(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      label: 'Password',
      type: 'password',
      minLength: 8,
      required: true,
    }

    return UiFormField.input(key, { ...templateOptions, ...defaults }, options)
  }

  static radio(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.field(key, 'radio', templateOptions, options)
  }

  static select(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.field(key, 'select', templateOptions, options)
  }
  static textarea(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 }

    return UiFormField.field(key, 'textarea', { ...defaultTemplateOptions, ...templateOptions }, options)
  }

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template }
  }

  static time(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return UiFormField.input(key, { ...templateOptions, type: 'time' }, { ...options })
  }
}

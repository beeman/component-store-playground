// Original implementation
// https://github.com/ngx-formly/ngx-formly/blob/main/demo/src/app/shared/stackblitz/stackblitz-writer.ts
import { Injectable } from '@angular/core'
import { templates } from './blitzer-templates'

export interface ExampleType {
  title: string
  description: string
  component: any
  deps?: string[]
  debug: boolean
  files: { file: string; content: string }[]
}

@Injectable()
export class BlitzerService {
  readonly copyright = `Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license`

  readonly stackblitzUrl = 'https://run.stackblitz.com/api/angular/v1'
  readonly templateFiles: { [id: string]: ExampleType['files'] } = {
    core: [
      { file: 'polyfills.ts', content: templates.core['polyfills.ts'] },
      { file: 'angular.json', content: templates.core['angular.json'] },
      { file: 'main.ts', content: templates.core['main.ts'] },
      { file: 'index.html', content: templates.core['index.html'] },
    ],
    bootstrap: [
      {
        file: 'styles.scss',
        content: `@import '~bootstrap/scss/bootstrap.scss';`,
      },
    ],
    material: [
      {
        file: 'styles.scss',
        content: `@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';`,
      },
    ],
  }
  tags: string[] = ['angular', 'formly', 'example']
  angularVersion = '^7.0.0'
  materialVersion = '^7.0.0'
  formlyVersion = '^5.0.0'

  dependencies = {
    core: {
      '@angular/common': this.angularVersion,
      '@angular/compiler': this.angularVersion,
      '@angular/core': this.angularVersion,
      '@angular/forms': this.angularVersion,
      '@angular/platform-browser': this.angularVersion,
      '@angular/platform-browser-dynamic': this.angularVersion,
      'core-js': '^2.4.1',
      rxjs: '^6.4.0',
      'zone.js': '^0.9.0',
      tslib: '^1.7.0',
      '@ngx-formly/core': this.formlyVersion,
    },
    bootstrap: {
      '@ngx-formly/bootstrap': this.formlyVersion,
      bootstrap: '^4.2.1',
      'popper.js': '^1.14',
      jquery: '^3',
    },
    material: {
      '@ngx-formly/material': this.formlyVersion,
    },
  }

  constructor() {}

  test(): void {
    console.log('BlitzerService: test')
  }

  /**
   * Returns an HTMLFormElement that will open a new stackblitz template with the example data when
   * called with submit().
   */
  constructStackblitzForm(type: string, exampleData: ExampleType): HTMLFormElement {
    const indexFile = `src%2Fapp%2Fapp.component.ts`
    const form = this.createFormElement(indexFile)

    this.tags.forEach((tag, i) => this.appendFormInput(form, `tags[${i}]`, tag))
    this.appendFormInput(form, 'private', 'true')
    this.appendFormInput(form, 'description', exampleData.title)

    const appModule = exampleData.files.find((f) => f.file === 'app.module.ts')

    if (!appModule) {
      console.log('exampleData', exampleData)
      throw new Error(`Can't find app.module.ts in exampleData`)
    }
    console.log('appModuleContent', appModule)
    const appModuleContent = appModule.content

    exampleData.deps = exampleData.deps || []

    const options: any = { type }

    if ('material' === options.type || appModuleContent.indexOf('@angular/material') !== -1) {
      options.includeMaterial = true
    }

    if (
      ['material'].indexOf(options.type) !== -1 ||
      options.includeMaterial ||
      exampleData.files.map((f) => f.content).some((content) => content.indexOf('@angular/animations') !== -1)
    ) {
      options.useAnimation = true
    }

    if (appModuleContent.indexOf('ag-grid-angular') !== -1) {
      options.includeAgGrid = true
    }

    if (exampleData.deps.indexOf('fontawesome') !== -1) {
      options.includeFontawesome = true
    }

    if (appModuleContent.indexOf('@swimlane/ngx-datatable') !== -1) {
      options.includeNgxDatable = true
    }

    if (appModuleContent.indexOf('@ngx-translate/core') !== -1) {
      options.includeNgxTranslate = true
    }

    const deps = {
      ...this.dependencies.core,
      // @ts-ignore
      ...(this.dependencies[options.type] as any),
    }

    if (options.useAnimation) {
      deps['@angular/animations'] = this.angularVersion
    }

    if (options.includeMaterial) {
      deps['@angular/cdk'] = this.materialVersion
      deps['@angular/material'] = this.materialVersion
    }

    this.appendFormInput(form, 'dependencies', JSON.stringify(deps))
    ;[...this.templateFiles.core, ...this.templateFiles[options.type]].forEach((data) => {
      this.addFileToForm(form, this.replaceExamplePlaceholderNames(data.file, data.content, options), data.file, false)
    })

    exampleData.files.forEach((data) => {
      this.addFileToForm(
        form,
        this.replaceExamplePlaceholderNames(data.file, data.content, options),
        data.file,
        data.file.indexOf('assets') !== 0,
      )
    })

    return form
  }

  /** Constructs a new form element that will navigate to the stackblitz url. */
  private createFormElement(indexFile: string): HTMLFormElement {
    const form = document.createElement('form')
    form.action = `${this.stackblitzUrl}?file=${indexFile}`
    form.method = 'post'
    form.target = '_blank'
    return form
  }

  /** Appends the name and value as an input to the form. */
  private appendFormInput(form: HTMLFormElement, name: string, value: string): void {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }

  /**
   * Adds the file text to the form.
   * @param form the html form you are appending to
   * @param data example metadata about the example
   * @param content file contents
   * @param filename file name of the example
   * @param path path to the src
   * @param prependApp whether to prepend the 'app' prefix to the path
   */
  private addFileToForm(form: HTMLFormElement, content: string, filename: string, prependApp = true): void {
    if (prependApp) {
      filename = 'app/' + filename
    }

    if (filename !== 'angular.json') {
      filename = 'src/' + filename
    }

    this.appendFormInput(form, `files[${filename}]`, this.appendCopyright(filename, content))
  }

  private replaceExamplePlaceholderNames(fileName: string, content: string, options: any): string {
    if (fileName === 'app.module.ts') {
      if (options.useAnimation) {
        content = content.replace('@angular/common', '@angular/platform-browser/animations')
        content = content.replace(/CommonModule/g, 'BrowserAnimationsModule')
      } else {
        content = content.replace('@angular/common', '@angular/platform-browser')
        content = content.replace(/CommonModule/g, 'BrowserModule')
      }

      content = content.replace('declarations: [', `bootstrap: [AppComponent],\n  declarations: [`)
    } else if (fileName === 'styles.scss') {
      content = `${content}\nbody { padding: 10px; }`

      if (options.type !== 'material' && options.includeMaterial) {
        content = `${content}\n@import '~@angular/material/prebuilt-themes/deeppurple-amber.css'; `
      }
    }

    if (fileName === 'index.html' && options.includeFontawesome) {
      content = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">\n${content}`
    }

    content = content.replace(/_json/g, '.json')

    return content
  }

  private appendCopyright(filename: string, content: string): string {
    if (filename.indexOf('.ts') > -1 || filename.indexOf('.scss') > -1) {
      content = `${content}\n\n/**  ${this.copyright} */`
    } else if (filename.indexOf('.html') > -1) {
      content = `${content}\n\n<!-- ${this.copyright} -->`
    }
    return content
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReduxDevtoolsExtension } from './interfaces'
import { IS_EXTENSION_PRESENT, REDUX_DEVTOOLS_EXTENSION, REDUX_DEVTOOLS_EXTENSION_CONNECTION } from './tokens'

export function createIsExtensionOrMonitorPresent(extension: ReduxDevtoolsExtension | null) {
  return Boolean(extension)
}

export function createReduxDevtoolsExtension() {
  const extensionKey = '__REDUX_DEVTOOLS_EXTENSION__'

  if (typeof window === 'object' && typeof (window as any)[extensionKey] !== 'undefined') {
    return (window as any)[extensionKey]
  } else {
    return null
  }
}

export function createReduxDevtoolsExtensionConnection(extension: ReduxDevtoolsExtension | null) {
  if (extension) {
    return extension.connect()
  }

  return null
}

@NgModule({})
export class SharedUtilComponentStoreDevtoolsModule {
  static forRoot(enabled: boolean): ModuleWithProviders<SharedUtilComponentStoreDevtoolsModule> {
    if (enabled) {
      return {
        ngModule: SharedUtilComponentStoreDevtoolsModule,
        providers: [
          {
            provide: IS_EXTENSION_PRESENT,
            deps: [REDUX_DEVTOOLS_EXTENSION],
            useFactory: createIsExtensionOrMonitorPresent,
          },
          {
            provide: REDUX_DEVTOOLS_EXTENSION,
            useFactory: createReduxDevtoolsExtension,
          },
          {
            provide: REDUX_DEVTOOLS_EXTENSION_CONNECTION,
            deps: [REDUX_DEVTOOLS_EXTENSION],
            useFactory: createReduxDevtoolsExtensionConnection,
          },
        ],
      }
    }

    return { ngModule: SharedUtilComponentStoreDevtoolsModule }
  }
}

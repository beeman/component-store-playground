import { InjectionToken } from '@angular/core'
import { ReduxDevtoolsExtensionConnection } from '../interfaces'

export const REDUX_DEVTOOLS_EXTENSION_CONNECTION = new InjectionToken<ReduxDevtoolsExtensionConnection>(
  '@@REDUX_DEVTOOLS_EXTENSION_CONNECTION',
)

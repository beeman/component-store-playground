import { InjectionToken } from '@angular/core'
import { ReduxDevtoolsExtension } from '../interfaces'

export const REDUX_DEVTOOLS_EXTENSION = new InjectionToken<ReduxDevtoolsExtension>('@@REDUX_DEVTOOLS_EXTENSION')

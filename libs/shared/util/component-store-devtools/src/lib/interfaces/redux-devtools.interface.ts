export interface ReduxDevtoolsExtensionConnection {
  subscribe(listener: (change: any) => void): void

  unsubscribe(): void

  send(action: any, state: any): void

  init(state?: any): void

  error(anyErr: any): void
}

export interface ReduxDevtoolsExtension {
  connect(): ReduxDevtoolsExtensionConnection

  disconnect(): void

  send(action: any, state: any): void
}

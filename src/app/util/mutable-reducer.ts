import produce, { Draft } from 'immer'

export function mutableReducer<T, V>(
  callback: (state: Draft<T>, value?: V) => T | void,
): (oldState: T, value?: V) => T {
  return (oldState: T, value?: V) => {
    return produce(oldState, (state: Draft<T>) => callback(state, value)) as T
  }
}

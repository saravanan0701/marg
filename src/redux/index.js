import { createStore } from 'redux'
import MargApp from './../reducers'

export function StoreFactory(history) {
  return createStore(
    MargApp(history),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // Required by dev tools to moniter APP state.
    // TODO: this needs to be added only in case of dev mode.
  )
};
import { createStore } from 'redux'
import { MargApp } from './../reducers'

const store = createStore(
  MargApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // Required by dev tools to moniter APP state.
)

export default store;
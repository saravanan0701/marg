import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MargApp from './../reducers';
import { loadState } from '../localStorage';

const persistedState = loadState('state');

export function StoreFactory(history) {
  return createStore(
    MargApp(history),
    persistedState,
    devToolsEnhancer()
    // Required by dev tools to moniter APP state.
    // TODO: this needs to be added only in case of dev mode.
  )
};
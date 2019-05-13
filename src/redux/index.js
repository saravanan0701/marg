import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import MargApp from './../reducers';
import { stateRehydrateSaga, sessionPersistanceSaga, logoutUser } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export function StoreFactory(history) {
  const store = createStore(
    MargApp(history),
    // persistedState,
    composeWithDevTools(
    	applyMiddleware(sagaMiddleware),
    )
    // Required by dev tools to moniter APP state.
    // TODO: this needs to be added only in case of dev mode.
  );
	sagaMiddleware.run(stateRehydrateSaga);
  sagaMiddleware.run(sessionPersistanceSaga);
	sagaMiddleware.run(logoutUser);
	return store;
};


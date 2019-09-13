import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import MargApp from './../reducers';
import { stateRehydrateSaga, sessionPersistanceSaga, logoutUser } from "./auth-sagas";
import { loadProducts } from "./products-list-sagas";
import { fetchUserDetails } from "./user-sagas";
import { saveVariantInCart, persistCartFromCache } from "./cart-sagas";
import { createGuestCheckout, clearCartCache, editVariantQuantity } from "./cart-guest-create-saga";
import { onRouteChange } from "./route-saga";

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
  sagaMiddleware.run(loadProducts);
  sagaMiddleware.run(fetchUserDetails);
  sagaMiddleware.run(saveVariantInCart);
  sagaMiddleware.run(persistCartFromCache);
  sagaMiddleware.run(createGuestCheckout);
  sagaMiddleware.run(clearCartCache);
  sagaMiddleware.run(onRouteChange);
  sagaMiddleware.run(editVariantQuantity);
  return store;
};


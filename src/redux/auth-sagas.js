import { takeLatest, call, put } from "redux-saga/effects";
import gql from 'graphql-tag';

import actions from './../actions';

const TOKEN_VERIFY = gql(`
  mutation TokenVerify($token: String!) {
    tokenVerify(token: $token) {
      payload,
    }
  }
`);


export function* stateRehydrateSaga() {
  yield takeLatest("REHYDERATE_STATE_FROM_CACHE", rehyderateUserFromSession);
}

function fetchLoggedInUser(client) {
  const authToken = localStorage.getItem('authToken');
  if (authToken === null) {
    return undefined;
  }
  return client.mutate({
    mutation: TOKEN_VERIFY,
    variables: {
      token: authToken,
    }
  })
}

function* rehyderateUserFromSession({ client }) {
  try {
    const {
      data: {
        tokenVerify: {
          payload: {
            email,
          }
        }
      }
    } = yield call(fetchLoggedInUser, client);
    const authToken = localStorage.getItem('authToken');

    yield put(
      actions.persistAuthenticatedUserToState({
        email,
        authToken,
      })
    );
  
  } catch (e) {
    yield put(actions.loginFailure());
    
    //if user is not loggedin, cart length is set as `totalQuantity`.
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    yield put(
      actions.updateCartQuantity(cart.length)
    );
  }
}

export function* sessionPersistanceSaga() {
  yield takeLatest("PERSIST_AUTHENTICATED_USER", setSessionInCache);
}

function* setSessionInCache({ user }) {
  try {
    localStorage.setItem('authToken', user.authToken);
    yield put(actions.persistAuthenticatedUserToState(user));
  } catch(e) {
    yield put(actions.loginFailure());
  }
}

export function* logoutUser() {
  yield takeLatest("LOGOUT", removeUserFromLocalCache);
}

function* removeUserFromLocalCache() {
  localStorage.removeItem('authToken');
  yield put(
    actions.resetCart()
  );
}
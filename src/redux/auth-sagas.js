import { takeLatest, call, put } from "redux-saga/effects";
import gql from 'graphql-tag';
import axios from 'axios';

import actions from './../actions';

const TOKEN_VERIFY = gql(`
  mutation TokenVerify($token: String!) {
    tokenVerify(token: $token) {
      payload,
    }
  }
`);

const GET_VARIANTS = gql`
  query GetVariants($ids: [ID]!, $first: Int){
    productVariants(ids: $ids, first: $first){
      edges{
        node{
          id
          isDigital
          inrPrice{
            currency
            amount
            localized
          }
          usdPrice{
            currency
            amount
            localized
          }
          product{
            name
            thumbnail{
              url
            }
            images{
              url
            }
          }
        }
      }
    }
  }
`

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

function* listVariants(client, variantIds) {
  return yield call(
    () => client.query({
      query: GET_VARIANTS,
      variables: {
        ids: variantIds,
        first: 100,
      }
    })
  )
}

function getCountryInfo() {
  return axios.get("https://api.ipdata.co/?api-key=fa7bbaa2558cd8503c27325d947c3edf9065aa07cbc6006791a27c0b")
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
    const variantIds = cart.map(({variantId}) => variantId);
    const totalQuantity = cart.reduce((acc, {quantity}) => (acc + quantity), 0)
    let {
      data: {
        productVariants: {
          edges: variantEdges,
        } = {},
      } = {},
    } = yield call(
      () => listVariants(client, variantIds)
    )
    const getVariantQuantity = (id) => {
      const variant = cart.find(({variantId}) => id === variantId);
      return variant? variant.quantity: 0;
    }
    variantEdges = variantEdges.map(({node}) => ({variant: {...node}, quantity: getVariantQuantity(node.id)}))
    yield put(
      actions.updateCheckoutLines({lines: variantEdges})
    );
    yield put(
      actions.updateCartQuantity(totalQuantity)
    );
  }
  try {
    const {
      data: {
        country_code,
      }
    } = yield call(getCountryInfo);
    yield put(
      actions.setCurrency(country_code === "IN"? "INR": "USD")
    )
  } catch (e) {
    yield put(
      actions.setCurrency("INR")
    )
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
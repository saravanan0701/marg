import { takeLatest, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';
import axios from 'axios';
import { getLocalizedAmountBySymbol } from "./../utils/";

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
            id
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

export const getUserFromState = (state) => state.auth;

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

function* setCurrencyPreference() {
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

function* rehyderateUserFromSession({ client }) {
  yield call(
    () => setCurrencyPreference()
  );
  const {currency} = yield select(getUserFromState);
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
    if(cart.length === 0) {
      return;
    }
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

    const getTotalPrice = (variant) => {
      const cartVariant = cart.find(({variantId}) => variant.id === variantId);
      let amount;
      if(currency === "INR") {
        amount = variant.inrPrice.amount;
        return {
          currency,
          amount: amount * (cartVariant? cartVariant.quantity: 1),
          localized: getLocalizedAmountBySymbol({currency, amount: amount * (cartVariant? cartVariant.quantity: 1)}),
        }
      } else {
        amount = variant.usdPrice.amount;
        return {
          currency,
          amount: amount * (cartVariant? cartVariant.quantity: 1),
          localized: getLocalizedAmountBySymbol({currency, amount: amount * (cartVariant? cartVariant.quantity: 1)}),
        }
      }
    }

    variantEdges = variantEdges.map(({node}) => ({
      variant: {...node},
      quantity: getVariantQuantity(node.id),
      totalPrice: {
        gross: getTotalPrice(node),
        net: getTotalPrice(node),
      }
    }))
    const totalPriceForCart = variantEdges.reduce((acc, { totalPrice: { gross: { amount }={} } ={} }) => (
      acc + amount
    ), 0);

    yield put(
      actions.updateCheckoutLines({
        lines: variantEdges,
        subtotalPrice: {
          gross: {
            currency,
            amount: totalPriceForCart,
            localized: getLocalizedAmountBySymbol({currency, amount: totalPriceForCart}),
          },
          net: {
            currency,
            amount: totalPriceForCart,
            localized: getLocalizedAmountBySymbol({currency, amount: totalPriceForCart}),
          }
        },
        totalPrice: {
          gross: {
            currency,
            amount: totalPriceForCart,
            localized: getLocalizedAmountBySymbol({currency, amount: totalPriceForCart}),
          },
          net: {
            currency,
            amount: totalPriceForCart,
            localized: getLocalizedAmountBySymbol({currency, amount: totalPriceForCart}),
          }
        }
      })
    );
    yield put(
      actions.updateCartQuantity(totalQuantity)
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
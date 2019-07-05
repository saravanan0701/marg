import { takeEvery, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';
import client from './../apollo/';
import actions from './../actions';


export function* saveVariantInCart() {
  yield takeEvery("SAVE_VARIANT", saveVariant);
}

const CREATE_NEW_CHECKOUT = gql(`
  mutation SaveVariant($variantId: ID!, $quantity: Int!) {
    checkoutCreate(input: {
      lines: {
        quantity: $quantity,
        variantId: $variantId
      }
    }) {
      checkout{
        id
        token
        quantity
        lines{
          quantity
          totalPrice{
            currency
            gross{
              amount
            }
            net{
              amount
            }
          }
          variant{
            id
            product{
              id
              name
              thumbnail{
                url
                alt
              }
            }
          }
        }
      }
    }
  }
`);

const SAVE_VARIANT_TO_CHECKOUT = gql(`
  mutation SaveVariant($checkoutId: ID!, $variantId: ID!, $quantity: Int!) {
    checkoutLinesAdd(
      checkoutId: $checkoutId,
      lines: [
        {
          quantity: $quantity,
          variantId: $variantId
        }
      ]
    ) {
      checkout{
        id
        token
        quantity
        lines{
          quantity
          totalPrice{
            currency
            gross{
              amount
            }
            net{
              amount
            }
          }
          variant{
            id
            product{
              id
              name
              thumbnail{
                url
                alt
              }
            }
          }
        }
      }
    }
  }
`)

export const getUserFromState = (state) => state.auth;
export const getCartFromState = (state) => state.cart;

function* saveVariant({
  type,
  variantDetails: {
    quantity: variantQuantity,
    variant: {
      id,
    },
  }
}) {
  try {
    const auth = yield select(getUserFromState);
    const {
      checkoutId,
    } = yield select(getCartFromState);

    if(!auth.email) {
      // const cart = JSON.parse(localStorage.getItem('cart'));
      //Use local cache
    } else if(checkoutId) {
      const {
        data: {
          checkoutLinesAdd: {
            checkout: {
              quantity,
              lines,
            },
          }
        }
      } = yield call(() => {
        return client.mutate({
          mutation: SAVE_VARIANT_TO_CHECKOUT,
          variables: {
            checkoutId,
            quantity: variantQuantity,
            variantId: id,
          }
        })
      });
      yield put(
        actions.updateCheckoutLines({
          quantity,
          lines,
        })
      );
    } else if(!checkoutId) {
      //Set variant data on graphql
      const {
        data: {
          checkoutCreate: {
            checkout,
          }
        }
      } = yield call(() => {
        return client.mutate({
          mutation: CREATE_NEW_CHECKOUT,
          variables: {
            quantity: variantQuantity,
            variantId: id,
          }
        })
      });
      yield put(
        actions.initCheckout(checkout)
      );
    }
  
  } catch (e) {
    // yield put(actions.loginFailure());
  }
}
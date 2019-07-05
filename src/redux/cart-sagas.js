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

export const getUserFromState = (state) => state.auth

function* saveVariant({
  type,
  variantDetails: {
    quantity,
    variant: {
      id,
    },
  }
}) {
  try {
    const auth = yield select(getUserFromState);
    if(!auth.email) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      //Use local cache
    } else {
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
            quantity,
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
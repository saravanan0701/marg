import { takeEvery, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';
import client from './../apollo/';
import actions from './../actions';


export function* saveVariantInCart() {
  yield takeEvery("SAVE_VARIANT", saveVariant);
}

export function* persistCartFromCache() {
  yield takeEvery("PERSIST_CART_FROM_CACHE", persistCartItems);
}

const CREATE_NEW_CHECKOUT = gql(`
  mutation SaveVariant(
    $lines: [CheckoutLineInput]!,
  ) {
    checkoutCreate(input: {
      lines: $lines,
    }) {
      checkout{
        id
        token
        quantity
        totalPrice{
          gross{
            currency
            amount
          }
          net{
            currency
            amount
          }
        }
        lines{
          id
          quantity
          totalPrice{
            gross{
              currency
              amount
            }
            net{
              currency
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
        shippingAddress{
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country{
            country
            code
          }
          countryArea
          phone
        }
        availableShippingMethods{
          id
          name
          price{
            currency
            amount
          }
        }
      }
    }
  }
`);

const SAVE_VARIANT_TO_CHECKOUT = gql(`
  mutation SaveVariant(
    $checkoutId: ID!,
    $lines: [CheckoutLineInput]!,
  ) {
    checkoutLinesAdd(
      checkoutId: $checkoutId,
      lines: $lines
    ) {
      checkout{
        id
        token
        quantity
        totalPrice{
          gross{
            currency
            amount
          }
          net{
            currency
            amount
          }
        }
        lines{
          id
          quantity
          totalPrice{
            gross{
              currency
              amount
            }
            net{
              currency
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
          shippingAddress{
            id
            firstName
            lastName
            streetAddress1
            streetAddress2
            city
            cityArea
            postalCode
            country{
              country
              code
            }
            countryArea
            phone          
          }
        }
        availableShippingMethods{
          id
          name
          price{
            currency
            amount
          }
        }
      }
    }
  }
`)

export const getUserFromState = (state) => state.auth;
export const getCartFromState = (state) => state.cart;

function* createCheckoutAndLines(lines) {
  const {
    data: {
      checkoutCreate: {
        checkout,
      }
    }
  } = yield call(
    () => (
      client.mutate({
        mutation: CREATE_NEW_CHECKOUT,
        variables: {
          lines,
        }
      })
    )
  );
  return checkout;
}

function* addCheckoutLines(checkoutId, lines) {
  const {
    data: {
      checkoutLinesAdd: {
        checkout,
      }
    }
  } = yield call(
    () => (
      client.mutate({
        mutation: SAVE_VARIANT_TO_CHECKOUT,
        variables: {
          checkoutId,
          lines,
        }
      })
    )
  );
  return checkout;  
}

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
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({
        quantity: variantQuantity,
        variantId: id,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      if(cart.length > 0) {
        yield put(
          actions.updateCartQuantity(cart.length)
        );
      }
      //Use local cache
    } else if(checkoutId) {
      const createdCheckout = yield call(
        () => addCheckoutLines(
          checkoutId,
          [
            {
              quantity: variantQuantity,
              variantId: id,
            }
          ]
        )
      );
      yield put(
        actions.updateCheckoutLines(createdCheckout)
      );
    } else if(!checkoutId) {
      //Set variant data on graphql
      const createdCheckout = yield call(
        () => createCheckoutAndLines([
          {
            quantity: variantQuantity,
            variantId: id,
          }
        ])
      )
      yield put(
        actions.initCheckout(createdCheckout)
      );
      
    }
  
  } catch (e) {
    // Something went wrong while updating cart.
    // yield put(actions.loginFailure());
  }
}

function* persistCartItems({
  type,
  checkout,
}) {

  try {
    const auth = yield select(getUserFromState);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart.length === 0) {
      return;
    }

    if(checkout.id) {
      const createdCheckout = yield call(
        () => addCheckoutLines(
          checkout.id,
          cart,
        )
      );
      yield put(
        actions.updateCheckoutLines(createdCheckout)
      );
      localStorage.setItem('cart', "[]");
    } else {
      const createdCheckout = yield call(
        () => addCheckoutLines(
          checkout.id,
          cart,
        )
      );
      yield put(
        actions.updateCheckoutLines(createdCheckout)
      );
      localStorage.setItem('cart', "[]");
    }

  } catch {
    //Failed to save your items on cart, please try again later.
  }

}
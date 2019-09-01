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
      errors{
        field
        message
      }
      checkout{
        id
        token
        quantity
        totalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
        subtotalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
        lines{
          id
          quantity
          totalPrice{
            gross{
              currency
              amount
              localized
            }
            net{
              currency
              amount
              localized
            }
          }
          variant{
            id
            isDigital
            product{
              id
              name
              images {
                url
              }
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
          priceInr{
            currency
            amount
            localized
          }
          priceUsd{
            currency
            amount
            localized
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
      errors{
        field
        message
      }
      checkout{
        id
        token
        quantity
        totalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
        subtotalPrice{
          gross{
            currency
            amount
            localized
          }
          net{
            currency
            amount
            localized
          }
        }
        lines{
          id
          quantity
          totalPrice{
            gross{
              currency
              amount
              localized
            }
            net{
              currency
              amount
              localized
            }
          }
          variant{
            id
            isDigital
            product{
              id
              name
              images {
                url
              }
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
          priceInr{
            currency
            amount
            localized
          }
          priceUsd{
            currency
            amount
            localized
          }
        }
      }
    }
  }
`)

export const getUserFromState = (state) => state.auth;
export const getCartFromState = (state) => state.cart;

function *showCartNotification(errors) {
  if(errors && errors.length > 0) {
    yield put(
      actions.errorNotification("Error adding item to cart")
    );
  } else {
    yield put(
      actions.successNotification("Added item to cart")
    ); 
  }
}

function* createCheckoutAndLines(lines) {
  const {
    data: {
      checkoutCreate: {
        checkout,
        errors,
      }={}
    }={},
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
  yield call(
    () => showCartNotification(errors)
  );
  return checkout;
}

function* addCheckoutLines(checkoutId, lines) {
  const {
    data: {
      checkoutLinesAdd: {
        checkout,
        errors,
      } = {}
    },
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
  yield call(
    () => showCartNotification(errors)
  )
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
    if(e) {
      yield put(
        actions.errorNotification("Failed to item to cart")
      )
    }
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
    } else {
      const createdCheckout = yield call(
        () => createCheckoutAndLines(
          cart,
        )
      );
      yield put(
        actions.initCheckout(createdCheckout)
      );
    }
    localStorage.setItem('cart', "[]");

  } catch {
    //Failed to save your items on cart, please try again later.
  }

}
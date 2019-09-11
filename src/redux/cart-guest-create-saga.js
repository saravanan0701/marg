import { takeEvery, call, put, select } from "redux-saga/effects";


import gql from 'graphql-tag';
import client from './../apollo/';
import actions from './../actions';
import { getLocalizedAmountBySymbol } from "./../utils/";

const CREATE_NEW_CHECKOUT = gql(`
  mutation CreateCheckout(
    $email: String!,
    $shippingAddress: AddressInput!,
    $lines: [CheckoutLineInput]!,
    $currencyPreference: String,
  ) {
    checkoutCreate(input: {
      email: $email,
      lines: $lines,
      shippingAddress: $shippingAddress,
      billingAddress: $shippingAddress,
      currencyPreference: $currencyPreference,
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

const SAVE_SHIPPING_TO_CHECKOUT = gql`
  mutation SaveAddress($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      checkout {
        shippingMethod {
          id
          name
          priceInr {
            amount
            currency
            localized
          }
          priceUsd {
            amount
            currency
            localized
          }
        }
        totalPrice {
          net {
            amount,
            localized
          }
          gross {
            amount,
            localized
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const getUserFromState = (state) => state.auth;
export const getCartFromState = (state) => state.cart;

export function* createGuestCheckout() {
  yield takeEvery("CREATE_GUEST_CHECKOUT", createCheckout);
}

export function* clearCartCache() {
  yield takeEvery("CLEAR_CART_CACHE", clearCart);
}

function* clearCart() {
  yield localStorage.removeItem('cart');
}

function* createCheckout({checkoutDetails: {shippingAddress, email} ={} }={}) {
  const {currency} = yield select(getUserFromState);
  let { lines } = yield select(getCartFromState);
  lines = lines.map(({quantity, variant: {id: variantId} = {} }) => ({variantId, quantity}));
  try {
    const {
      data: {
        checkoutCreate: {
          checkout,
          errors: checkoutCreateErrors,
        } = {}
      } = {}
    } = yield call(
      () => client.mutate({
        mutation: CREATE_NEW_CHECKOUT,
        variables: {
          lines,
          email,
          shippingAddress,
          currencyPreference: currency,
        }
      })
    );
    
    if(checkoutCreateErrors.length === 0) {
      yield put(
        actions.successNotification("Saved address")
      );
      yield put(
        actions.initCheckout(checkout)
      )
      if(checkout && checkout.availableShippingMethods && checkout.availableShippingMethods.length > 0) {
        const {
          data: {
            checkoutShippingMethodUpdate: {
              checkout: {
                shippingMethod,
                totalPrice,
              },
              errors: shippingMethodErrors,
            }
          }
        } = yield call(
          () => client.mutate({
            mutation: SAVE_SHIPPING_TO_CHECKOUT,
            variables: {
              checkoutId: checkout.id,
              shippingMethodId: checkout.availableShippingMethods[0].id
            }
          })
        );
        if(shippingMethodErrors.length === 0) {
          yield put(
            actions.updateShippingMethod(shippingMethod)
          )
          yield put(
            actions.updateCartTotalPrice(totalPrice)
          )
        }
      }
    } else {
      yield put(
        actions.errorNotification("Error saving address")
      ); 
    }
  } catch (e) {
    yield put(
      actions.errorNotification("Error saving address")
    );
  }

}
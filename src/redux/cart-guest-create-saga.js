import { takeEvery, call, put, select } from "redux-saga/effects";


import gql from 'graphql-tag';
import client from './../apollo/';
import actions from './../actions';
import { getLocalizedAmountBySymbol, getLocalizedAmount } from "./../utils/";
import cart from "../actions/cart";

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
  yield takeEvery("CLEAR_CART_CACHE", function*() {
    yield localStorage.removeItem('cart');
  });
}

const getCartTotal = (lines, currency) => {
  const sumPrice = lines.reduce((acc, {totalPrice: {gross: {currency, amount}}}) => acc + amount, 0);
  const sumTotal = {
    currency,
    amount: sumPrice,
    localized: getLocalizedAmountBySymbol({ currency, amount: sumPrice }),
  };
  return {
    gross: sumTotal,
    net: sumTotal,
  };
}

export function* editVariantQuantity() {
  yield takeEvery("GUEST_EDIT_VARIANT_QUANTITY", function*({ variantId, quantity }) {
    const {currency} = yield select(getUserFromState);
    let { lines } = yield select(getCartFromState);
    lines = lines.map((line) => {
      const { totalPrice, variant: { id, inrPrice: {amount: inrAmount}={}, usdPrice: {amount: usdAmount}={} } = {} } = line;
      if(variantId === id) {
        const amount = getLocalizedAmount({currency, inr: inrAmount, usd: usdAmount});
        const calcAmount = quantity * amount;
        const price = {
          currency,
          amount: calcAmount,
          localized: getLocalizedAmountBySymbol({currency, amount: calcAmount}),
        };
        return {
          ...line,
          quantity: quantity,
          totalPrice: {
            gross: price,
            net: price,
          }
        };
      }
      return line; 
    });
    const cartTotalPrice = getCartTotal(lines, currency);
    yield put(
      actions.updateCheckoutLines({
        lines,
        totalPrice: cartTotalPrice,
        subtotalPrice: cartTotalPrice,
      })
    )
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map((cart) => {
      if(cart.variantId === variantId) {
        return{
          ...cart,
          quantity
        }
      }
      return cart;
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  });
}

export function* removeItemFromCart(){
  yield takeEvery("GUEST_REMOVE_VARIANT", function*({variantId}) {
    const { currency } = yield select(getUserFromState);
    let { lines } = yield select(getCartFromState);
    lines = lines.reduce((acc, line) => {
      if(variantId === line.variant.id) {
        return acc;
      }
      return acc.concat(line);
    }, []);
    const cartTotalPrice = getCartTotal(lines, currency);
    yield put(
      actions.updateCheckoutLines({
        lines,
        totalPrice: cartTotalPrice,
        subtotalPrice: cartTotalPrice,
      })
    )
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.reduce((acc, cartIt) => {
      if(variantId === cartIt.variantId) {
        return acc;
      }
      return acc.concat(cartIt);
    }, []);
    localStorage.setItem("cart", JSON.stringify(cart))
  });
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
            actions.setAddressSaved(true)
          );
          yield put(
            actions.updateShippingMethod(shippingMethod)
          )
          yield put(
            actions.updateCartTotalPrice(totalPrice)
          )
          yield put(
            actions.setAddressSaved(false)
          )
        }
      }
    } else {
      for(let i = 0; i < checkoutCreateErrors.length; i++) {
        if (checkoutCreateErrors[i].field === "phone") {
          yield put(actions.errorNotification("Phone number is invalid"));
        } else if (checkoutCreateErrors[i].field === "postalCode") {
          yield put(actions.errorNotification("Postal code is invalid for selected country/state"));
        }
      }
    }
  } catch (e) {
    yield put(
      actions.errorNotification("Error saving address")
    );
  }

}
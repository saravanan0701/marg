import { takeLatest, call, put } from "redux-saga/effects";
import gql from 'graphql-tag';
import client from './../apollo/';

import actions from './../actions';

const QUERY_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      subscriptions{
        id
        readableDigitalFiles{
          id
        }
        startDate
        endDate
        subscription{
          id
          name
          description
          issueType
          categoryType
          variantType
        }
      }
      addresses{
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
      checkout{
        id
        quantity
        token
        discountAmount
        totalPrice{
          net{
            currency
            amount
            localized
          }
          gross{
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
          totalPrice{
            net{
              currency
              amount
              localized
            }
            gross{
              currency
              amount
              localized
            }
          }
          quantity
          variant{
            id
            name
            sku
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
        shippingMethod{
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
      orders(first:100) {
        edges {
          node {
            id
            visibleOrderId
            currencyPreference
            statusDisplay
            created
            totalInr {
              net{
                currency
                amount
                localized
              }
            }
            totalUsd {
              net{
                currency
                amount
                localized
              }
            }
            lines {
              id
              productName
              productSku
              variant{
                isDigital
                product{
                  id
                  name
                  editors {
                    name
                  }
                  attributes {
                    attribute {
                      slug
                    }
                    value {
                      name
                    }
                  }
                  images{
                    url
                  }
                }
              }
              quantity
              thumbnail(size:100){
                url
              }
              unitPriceInr{
                net{
                  currency
                  amount
                  localized
                }
              }
              unitPriceUsd{
                net{
                  currency
                  amount
                  localized
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function* fetchUserDetails() {
  yield takeLatest("PERSIST_AUTHENTICATED_USER_TO_STATE", setCurrenUserDetails);
  yield takeLatest("RELOAD_USER_DETAILS", setCurrenUserDetails);
}

function queryUserDetails() {
  return client.query({
    query: QUERY_ME,
  })
}

function* setCurrenUserDetails() {
  try {
    const {
      data: {
        me: {
          id,
          firstName,
          lastName,
          checkout,
          addresses,
          orders: {
            edges: orders,
          } = {},
          subscriptions,
        }
      }
    } = yield call(queryUserDetails, client);
    yield put(
      actions.setUserDetails({
        id,
        firstName,
        lastName,
        addresses,
      })
    );
    if(checkout) {
      yield put(
        actions.initCheckout(checkout)
        // Set state with current checkout object, if present.
      );
    }
    if(orders && orders.length > 0) {
      yield put(
        actions.setOrders(orders.map(({node}) => ({...node})))
        // Set state with order, if present.
      );
    }
    yield put(
      actions.persistCartFromLocalCache(checkout)
    );
    yield put(
      actions.initSubscriptions(subscriptions)
    );
  
  } catch (e) {
    // yield put(actions.loginFailure());
    // TODO: Handle me API failure.
  } 
}
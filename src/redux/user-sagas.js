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
        totalPrice{
          net{
            currency
            amount
          }
          gross{
            currency
            amount
          }
        }
        lines{
          id
          totalPrice{
            net{
              currency
              amount
            }
            gross{
              currency
              amount
            }
          }
          quantity
          variant{
            id
            name
            sku
            isDigital
            product{
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
          price{
            currency
            amount
          }
        }
      }
      orders(first:100) {
        edges {
          node {
            id
            visibleOrderId
            statusDisplay
            created
            total {
              net{
                currency
                amount
              }
            }
            lines {
              id
              productName
              productSku
              variant{
                isDigital
                product{
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
              unitPrice{
                net{
                  currency
                  amount
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
  
  } catch (e) {
    // yield put(actions.loginFailure());
    // TODO: Handle me API failure.
  } 
}
import { takeLatest, call, put } from "redux-saga/effects";
import gql from 'graphql-tag';
import client from './../apollo/';

import actions from './../actions';

const QUERY_ME = gql`
  query Me {
    me {
      firstName
      lastName
      email
      checkout{
        id
        quantity
        token
        lines{
          totalPrice{
            net{
              amount
            }
            gross{
              amount
            }
          }
          quantity
          variant{
            id
            name
            sku
            product{
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
          firstName,
          lastName,
          checkout,
        }
      }
    } = yield call(queryUserDetails, client);

    yield put(
      actions.setUserName({
        firstName,
        lastName,
      })
    );
    yield put(
      actions.initCheckout(checkout)
    );
  
  } catch (e) {
    // yield put(actions.loginFailure());
    // TODO: Handle me API failure.
  } 
}
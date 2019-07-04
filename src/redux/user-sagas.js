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
        }
      }
    } = yield call(queryUserDetails, client);

    yield put(
      actions.setUserName({
        firstName,
        lastName,
      })
    );
  
  } catch (e) {
    // yield put(actions.loginFailure());
    // TODO: Handle me API failure.
  } 
}
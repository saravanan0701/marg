import { takeEvery, call, put, select } from "redux-saga/effects";

export function* onRouteChange(){
  yield takeEvery("@@router/LOCATION_CHANGE", function*() {
    return window.setTimeout(function() {
      window.scrollTo(0, 0);
    }, 0)
  });
}

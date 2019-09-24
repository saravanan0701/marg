import ReactGA from 'react-ga';
import { takeEvery, call, put, select } from "redux-saga/effects";

export function* onRouteChange(){
  yield takeEvery("@@router/LOCATION_CHANGE", function*({payload: {location: {pathname} }}) {
    return window.setTimeout(function() {
      window.scrollTo(0, 0);
      ReactGA.pageview(pathname);
    }, 0)
  });
}

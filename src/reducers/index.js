import { combineReducers } from 'redux'
import { AuthReducers } from './auth'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  auth: AuthReducers,
  router: connectRouter(history),
});
import { combineReducers } from 'redux'
import { AuthReducers } from './auth'


export const MargApp = combineReducers({
  loggedInUser: AuthReducers,
});
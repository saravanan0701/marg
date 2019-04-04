import { combineReducers } from 'redux'
import { AuthReducers } from './auth'
import { ProductsListReducers } from './products'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  loggedInUser: AuthReducers,
  products: ProductsListReducers,
  router: connectRouter(history),
});
import { combineReducers } from 'redux'
import { AuthReducers } from './auth'
import { ProductListReducers } from './products'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  auth: AuthReducers,
  productList: ProductListReducers,
  router: connectRouter(history),
});
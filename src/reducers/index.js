import { combineReducers } from 'redux'
import { AuthReducers } from './auth'
import { ProductListReducers } from './products'
import { CartReducers } from './cart'
import { NotificationReducer } from './notifications'
import { EventReducers } from './events'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  auth: AuthReducers,
  productList: ProductListReducers,
  cart: CartReducers,
  notifications: NotificationReducer,
  events:EventReducers,
  router: connectRouter(history),
});

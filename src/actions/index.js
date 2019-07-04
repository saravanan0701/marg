import authActions from './auth';
import productListActions from './products';
import cartActions from './cart';

const rehyderateStateFromCache = (client) => ({
  type: 'REHYDERATE_STATE_FROM_CACHE',
  client
})

export default {
	...authActions,
	...productListActions,
	...cartActions,
	rehyderateStateFromCache,
}
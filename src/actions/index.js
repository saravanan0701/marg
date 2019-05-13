import authActions from './auth';
import productListActions from './products';

const rehyderateStateFromCache = (client) => ({
  type: 'REHYDERATE_STATE_FROM_CACHE',
  client
})

export default {
	...authActions,
	...productListActions,
	rehyderateStateFromCache,
}
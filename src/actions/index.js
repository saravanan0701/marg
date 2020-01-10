import authActions from './auth';
import productListActions from './products';
import cartActions from './cart';
import notificationActions from './notifications';
import event from './event';
import blog from './blog';

const rehyderateStateFromCache = (client) => ({
  type: 'REHYDERATE_STATE_FROM_CACHE',
  client
})

export default {
  ...blog,
  ...event,
	...authActions,
	...productListActions,
	...cartActions,
	...notificationActions,
	rehyderateStateFromCache,
}

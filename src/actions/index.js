import authActions from './auth';

const rehyderateStateFromCache = (client) => ({
  type: 'REHYDERATE_STATE_FROM_CACHE',
  client
})

export default {
	...authActions,
	rehyderateStateFromCache,
}
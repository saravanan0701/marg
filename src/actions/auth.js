const persistAuthenticatedUserToState = user => ({
  type: 'PERSIST_AUTHENTICATED_USER_TO_STATE',
  user
});

const persistAuthenticatedUser = user => ({
  type: 'PERSIST_AUTHENTICATED_USER',
  user
});
//`PERSIST_AUTHENTICATED_USER` is intercepted by a saga, emits a side-effect `PERSIST_AUTHENTICATED_USER_TO_STATE`

const loginFailure = user => ({
  type: 'LOGIN_FAILURE',
  user
})

const setUserDetails = user => ({
  type: 'SET_USER_DETAILS',
  user
})

const updateUserName = user => ({
  type: 'UPDATE_USER_NAME',
  user
})

const updateUserEmail = user => ({
  type: 'UPDATE_USER_EMAIL',
  user
})

const addNewAddress = address => ({
  type: 'ADD_NEW_ADDRESS',
  address,
})

const logout = () => ({
  type: 'LOGOUT',
})

const setOrders = (orders) => ({
  type: 'SET_ORDERS',
  orders,
})

const setCurrency = (currencyCode) => ({
  type: 'SET_CURRENCY_CODE',
  currencyCode,
})

const reloadAuthenticatedUser = () => ({
  type: 'RELOAD_USER_DETAILS',
})

const initSubscriptions = (subscriptions) => ({
  type: 'INIT_SUBSCRIPTIONS',
  subscriptions,
})

export default {
  persistAuthenticatedUserToState,
  persistAuthenticatedUser,
  loginFailure,
  logout,
  setUserDetails,
  addNewAddress,
  setOrders,
  setCurrency,
  updateUserName,
  updateUserEmail,
  reloadAuthenticatedUser,
  initSubscriptions,
}

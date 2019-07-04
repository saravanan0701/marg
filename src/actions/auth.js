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

const setUserName = user => ({
  type: 'SET_USER_NAME',
  user
})

const logout = () => ({
  type: 'LOGOUT',
})

export default {
  persistAuthenticatedUserToState,
  persistAuthenticatedUser,
  loginFailure,
  logout,
  setUserName,
}

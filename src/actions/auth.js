const loginAttempt = () => ({
  type: 'LOGIN_ATTEMPT',
})

const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  user
});

const loginFailure = user => ({
  type: 'LOGIN_FAILURE',
  user
})

const logout = () => ({
  type: 'LOGOUT',
})

export default {
  loginAttempt,
  loginSuccess,
  loginFailure,
  logout
}

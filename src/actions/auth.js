const loginAs = loggedInUser => ({
  type: 'LOGIN_AS_USER',
  loggedInUser
});

export default {
  loginAs,
}

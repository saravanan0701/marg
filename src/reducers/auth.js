const AuthReducers = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_AS_USER':
      return {
        ...state,
        loggedInUser: {
          ...action.loggedInUser
        },
      };
    default:
      return state
  }
}

export default AuthReducers;
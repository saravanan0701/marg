export const AuthReducers = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_AS_USER':
      return {
        ...state,
        ...action.loggedInUser
      };
    default:
      return state
  }
}


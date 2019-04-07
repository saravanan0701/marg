export const AuthReducers = (state = {}, action) => {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.user.userEmail,
        authToken: action.user.authToken
      }

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userEmail: '',
        authToken: ''
      }

    default:
      return state
  }
}


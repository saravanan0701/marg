export const AuthReducers = (state = {}, action) => {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userEmail: action.user.userEmail,
        authToken: action.user.authToken
      }

    case 'LOGOUT':
      return {
        ...state,
        userEmail: '',
        authToken: ''
      }

    default:
      return state
  }
}


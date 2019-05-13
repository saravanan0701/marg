export const AuthReducers = (state = {}, action) => {
  switch (action.type) {

    case 'PERSIST_AUTHENTICATED_USER_TO_STATE':
      return {
        ...state,
        email: action.user.email,
        authToken: action.user.authToken
      }

    case 'LOGOUT':
      return {
        ...state,
        email: '',
        authToken: ''
      }

    default:
      return state
  }
}


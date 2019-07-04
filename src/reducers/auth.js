const INITIAL_USER_STATE = {
  email: null,
  authToken: null,
  firstName: null,
  lastName: null,
}
export const AuthReducers = (state = {}, action) => {
  switch (action.type) {

    case 'PERSIST_AUTHENTICATED_USER_TO_STATE':
      return {
        ...state,
        email: action.user.email,
        authToken: action.user.authToken
      }

    case 'SET_USER_NAME':
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
      }

    case 'LOGOUT':
      return {
        ...state,
        email: '',
        authToken: '',
        firstName: '',
        lastName: '',
      }

    default:
      return state
  }
}


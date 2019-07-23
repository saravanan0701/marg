const INITIAL_USER_STATE = {
  id: null,
  email: null,
  authToken: null,
  firstName: null,
  lastName: null,
  addresses: [],
  isLoading: true,
}
//TODO: Use above object, make sure it doesnt break anything else
export const AuthReducers = (state = {isLoading: true}, action) => {
  switch (action.type) {

    case 'PERSIST_AUTHENTICATED_USER_TO_STATE':
      return {
        ...state,
        email: action.user.email,
        authToken: action.user.authToken,
        isLoading: false,
      }

    case 'SET_USER_DETAILS':
      return {
        ...state,
        id: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        addresses: action.user.addresses.concat(),
        isLoading: false,
      }

    case 'ADD_NEW_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.concat(action.address),
      }

    case 'LOGOUT':
      return {
        ...state,
        email: '',
        authToken: '',
        firstName: '',
        lastName: '',
        isLoading: false,
      }

    default:
      return state
  }
}


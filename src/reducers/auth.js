import actions from "../actions";

const INITIAL_USER_STATE = {
  id: null,
  email: null,
  authToken: null,
  firstName: null,
  lastName: null,
  addresses: [],
  isLoading: true,
  orders: [],
  currency: "INR",
  subscriptions: [],
}
//TODO: Use above object, make sure it doesnt break anything else
export const AuthReducers = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {

    case 'PERSIST_AUTHENTICATED_USER_TO_STATE':
      return {
        ...state,
        email: action.user.email,
          authToken: action.user.authToken,
          isLoading: false,
      };

    case 'SET_USER_DETAILS':
      return {
        ...state,
        id: action.user.id,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          //Address will have `...` in it so avoiding those addresses while adding user details.
          addresses: action.user.addresses.filter(
            ({
              firstName
            }) => !firstName.toLowerCase().match(new RegExp(/\.\.\./gi))
          ),
          isLoading: false,
      };

    case 'UPDATE_USER_NAME':
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        isLoading: false
      }

    case 'UPDATE_USER_EMAIL':
      return {
        ...state,
        email: action.user.email,
        isLoading: false
      }

    case 'ADD_NEW_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.concat(action.address),
      };
    case 'LOGIN_FAILURE':
      return {
        ...INITIAL_USER_STATE,
        currency: state.currency,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...INITIAL_USER_STATE,
        isLoading: false,
      };

    case 'SET_ORDERS':
      return {
        ...state,
        orders: state.orders.concat(action.orders),
      }

    case 'SET_CURRENCY_CODE':
      return {
        ...state,
        currency: action.currencyCode,
      }
    
    case 'INIT_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: [ ...action.subscriptions ],
      }

    default:
      return state
  }
}
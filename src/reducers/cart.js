const INITIAL_CART_STATE = {
  checkoutId: null,
  lines: [],
  token: null,
  error: false,
  totalQuantity: 0,
  totalPrice: {},
  shippingAddress: {},
  availableShippingMethods: [],
  shippingMethod: {},
}
export const CartReducers = (state = INITIAL_CART_STATE, action) => {
  switch (action.type) {

    case 'INIT_CHECKOUT':
      return {
        ...state,
        checkoutId: action.checkout.id,
        lines: action.checkout.lines.concat(),
        token: action.checkout.token,
        totalQuantity: action.checkout.quantity,
        totalPrice: action.checkout.totalPrice,
        shippingAddress: {
          ...action.checkout.shippingAddress
        },
        availableShippingMethods: [
          ...action.checkout.availableShippingMethods
        ],
        shippingMethod: {
          ...action.checkout.shippingMethod
        },
        error: false,
      }

    case 'UPDATE_CHECKOUT_LINES':
      return {
        ...state,
        totalQuantity: action.checkout.quantity,
        lines: action.checkout.lines.concat(),
        totalPrice: action.checkout.totalPrice,
        error: false,
      }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        totalQuantity: action.totalQuantity,
      }

    case 'RESET_CART':
      return {
        ...state,
        ...INITIAL_CART_STATE,
      }

    case 'UPDATE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: {
          ...action.shippingAddress,
        },
      }

    case 'UPDATE_SHIPPING_METHOD':
      return {
        ...state,
        shippingMethod: {
          ...action.shippingMethod,
        },
      }

    default:
      return state
  }
}


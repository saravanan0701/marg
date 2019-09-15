import { getLocalizedAmountBySymbol } from "./../utils/";

const INITIAL_CART_STATE = {
  checkoutId: null,
  lines: [],
  token: null,
  error: false,
  totalQuantity: 0,
  totalPrice: {},
  subtotalPrice: {},
  shippingAddress: {},
  availableShippingMethods: [],
  shippingMethod: {},
  addressSaved: false,
}

const getTotalQuantity = (lines) => lines.reduce((acc, it) => acc + it.quantity, 0);

export const CartReducers = (state = INITIAL_CART_STATE, action) => {
  switch (action.type) {

    case 'INIT_CHECKOUT':
      return {
        ...state,
        checkoutId: action.checkout.id,
        lines: action.checkout.lines.concat(),
        token: action.checkout.token,
        totalQuantity: getTotalQuantity(action.checkout.lines),
        totalPrice: {...action.checkout.totalPrice},
        subtotalPrice: {...action.checkout.subtotalPrice},
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

    case 'UPDATE_ALL_CHECKOUT_LINES':
      return {
        ...state,
        lines: action.checkout.lines.concat(),
        totalQuantity: getTotalQuantity(action.checkout.lines),
        totalPrice: {...action.checkout.totalPrice},
        subtotalPrice: {...action.checkout.subtotalPrice},
        error: false,
      }
    
    case 'UPDATE_CHECKOUT_LINE':
      // Only used by guest checkout.
      const currency = action.line.currency;
      let lineFound = false;
      let lines = state.lines.map((it) => {
        if(it.variant.id === action.line.variant.id) {
          lineFound = true;
          ++it.quantity;
          it.totalPrice = action.line.totalPrice;
          return it
        }
        return it;
      });
      lines = lineFound ? [...lines]: (() => {
        delete action.line.totalQuantity;
        return state.lines.concat(action.line)
      })();

      const totalQuantity = lines.reduce((acc, {quantity}) => acc + quantity, 0);

      const totalAmount = lines.reduce((acc, {totalPrice: {gross : {amount=0, currency} ={} } ={} }={}) => acc + amount, 0)

      const totalMoney = {
        currency,
        amount: totalAmount,
        localized: getLocalizedAmountBySymbol({currency, amount: totalAmount}),
      }

      return {
        ...state,
        totalQuantity,
        lines: [...lines],
        totalPrice: {
          net: {...totalMoney},
          gross: {...totalMoney},
        },
        subtotalPrice: {
          net: {...totalMoney},
          gross: {...totalMoney},
        }
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

    case 'SET_AVAILABLE_SHIPPING_METHODS':
      return {
        ...state,
        availableShippingMethods: [
          ...action.availableShippingMethods,
        ],
      };

    case 'SET_LINE_QUANTITY':
      const { id: lineId, quantity }={} = action.line;
      return {
        ...state,
        lines: state.lines.map((line) => {
          if(line.id === lineId) {
            return {
              ...line,
              quantity,
            };
          }
          return {...line};
        })
      };

    case 'SET_TOTAL_QUANTITY':
      return {
        ...state,
        totalQuantity: action.totalQuantity,
      };

    case 'REMOVE_LINE_ITEM':
      return {
        ...state,
        lines: state.lines.reduce((acc, line) => {
          if(line.id === action.lineId) {
            return acc;
          }
          return acc.concat(line);
        }, [])
      }

    case 'UPDATE_CART_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: {
          ...action.cartTotalPrice
        }
      }
    
    case 'UPDATE_CART_SUB_TOTAL_PRICE':
      return {
        ...state,
        subtotalPrice: {
          ...action.cartSubTotalPrice,
        }
      }

    case 'UPDATE_CART_LINE_TOTAL_PRICE':
      return {
        ...state,
        lines: state.lines.reduce((acc, line) => {
          if(line.id !== action.lineId) {
            return acc.concat(line);
          }
          line.totalPrice = { ...action.lineTotalPrice };
          return acc.concat(line);
        }, []),
      }
    
    case 'SET_ADDRESS_SAVED_STATUS':
      return {
        ...state,
        addressSaved: action.isSaved,
      }

    default:
      return state
  }
}


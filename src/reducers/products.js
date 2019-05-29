const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  filter : {
    attributes: [],
    productType: null,
  },
}
export const ProductListReducers = (
  state = INITIAL_PRODUCT_LIST_STATE,
  action
) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        productList: {
          ...state.productList,
          products: action.products,
        }
      };
    case 'ADD_ATTRIBUTE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.concat(action.filter),
        }
      }
    case 'REPLACE_ATTRIBUTE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.map((filter) => {
            if(filter.type === action.filter.type) {
              return action.filter;
            }
            return filter;
          })
        },
      }
    case 'REMOVE_ATTRIBUTE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.reduce((acc, filter) => {
            if(action.filter.type !== filter.type) {
              return acc.concat(action.filter);
            }
            return acc;
          }, []),
        }
      }
    case 'ADD_PRODUCT_TYPE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          productType: action.productType,
        }
      }
    case 'REMOVE_PRODUCT_TYPE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          productType: null,
        }
      }
    default:
      return state
  }
}


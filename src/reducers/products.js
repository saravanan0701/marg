const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  filter : {
    attributes: [],
    category: null,
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
    case 'ADD_CATEGORY_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.category,
        }
      }
    case 'REMOVE_CATEGORY_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          category: null,
        }
      }
    default:
      return state
  }
}


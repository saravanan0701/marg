const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  filters : [],
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
    case 'ADD_FILTER':
      return {
        ...state,
        filters: state.filters.concat(action.filter),
      }
    case 'REPLACE_FILTER':
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if(filter.type === action.filter.type) {
            return action.filter;
          }
          return filter;
        })
      }
    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: state.filters.reduce((acc, filter) => {
          if(action.filter.type !== filter.type) {
            return acc.concat(action.filter);
          }
          return acc;
        }, []),
      }
    default:
      return state
  }
}


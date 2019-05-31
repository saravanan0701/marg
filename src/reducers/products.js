const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  loadingAllProducts: true,
  loadingNextPage: false,
  loadProductsError: false,
  filter : {
    attributes: [],
    productType: null,
  },
  sortBy: null,
  pagination: {
    first: 5,
    after: null,
    hasNextPage: false,
  },
}
export const ProductListReducers = (
  state = INITIAL_PRODUCT_LIST_STATE,
  action
) => {
  //Note: All actions which modify filter/sortBy/pagination should be added in saga to load data from backend.
  // actions which modify selected filter only change its state, a side-effect in `products-list-saga.js` causes
  // products to get fetched from server.
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        loadingAllProducts: true,
      };
    case 'LOAD_PRODUCTS_ERROR':
      return {
        ...state,
        loadingAllProducts: false,
        loadingNextPage: false,
        loadProductsError: true,
      };
    case 'REPLACE_PROUCTS':
      return {
        ...state,
        products: [...action.productsData.products],
        loadingAllProducts: false,
        pagination: {
          ...state.pagination,
          after: action.productsData.pagination.after,
          hasNextPage: action.productsData.pagination.hasNextPage,
        }
      };
    case 'ADD_ATTRIBUTE_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.concat(action.filter),
        },
        loadingAllProducts: true,
      };
    case 'REPLACE_ATTRIBUTE_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.map((filter) => {
            if(filter.type === action.filter.type) {
              return action.filter;
            }
            return filter;
          })
        },
      };
    case 'REMOVE_ATTRIBUTE_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.reduce((acc, filter) => {
            if(action.filter.type !== filter.type) {
              return acc.concat(filter);
            }
            return acc;
          }, []),
        }
      }
    case 'ADD_PRODUCT_TYPE_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          productType: action.productType,
        }
      }
    case 'REMOVE_PRODUCT_TYPE_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          productType: null,
        }
      }
    case 'ADD_SORT_BY':
      return {
        ...state,
        loadingAllProducts: true,
        sortBy: {
          ...action.sortBy,
        }
      }
    case 'RESET_SORT_BY':
      return {
        ...state,
        loadingAllProducts: true,
        sortBy: null,
      }
    default:
      return state
  }
}


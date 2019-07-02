const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  loadingAllProducts: true,
  loadingNextPage: false,
  loadProductsError: false,
  filter : {
    attributes: [],
    editors: [],
    category: null,
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
    case 'APPEND_PROUCTS':
      return {
        ...state,
        products: state.products.concat(action.productsData.products),
        loadingNextPage: false,
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
    case 'REMOVE_ATTRIBUTE_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          attributes: state.filter.attributes.reduce((acc, attribute) => {
            if(action.filterId !== attribute.filter.id) {
              return acc.concat(attribute);
            }
            return acc;
          }, []),
        }
      }
    case 'ADD_CATEGORY_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          category: {
            ...action.category,
          }
        }
      }
    case 'REMOVE_CATEGORY_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          category: null,
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
    case 'LOAD_NEXT_PAGE':
      return {
        ...state,
        loadingNextPage: true,
      }
    case 'ADD_EDITOR_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          editors: state.filter.editors.concat(action.editor),
        },
        loadingAllProducts: true,
      };
    case 'REMOVE_EDITOR_FILTER':
      return {
        ...state,
        loadingAllProducts: true,
        filter: {
          ...state.filter,
          editors: state.filter.editors.reduce((acc, editor) => {
            if(action.editor.id !== editor.id) {
              return acc.concat(editor);
            }
            return acc;
          }, []),
        }
      }
    default:
      return state
  }
}


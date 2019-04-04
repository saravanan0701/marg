const INITIAL_PRODUCT_LIST_STATE = {
  products: [],
  filters : [],
}
export const ProductsListReducers = (
  state = INITIAL_PRODUCT_LIST_STATE,
  action
) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        productsList: {
          ...state.productsList,
          products: action.products,
        }
      };
    default:
      return state
  }
}


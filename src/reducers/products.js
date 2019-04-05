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
    default:
      return state
  }
}


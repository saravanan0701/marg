const loadProducts = (client) => ({
  //Used by saga to initiate a graphql request to server.
  type: 'LOAD_PRODUCTS',
  client,
});

const loadProductsError = (client) => ({
  //Used by saga to initiate a graphql request to server.
  type: 'LOAD_PRODUCTS_ERROR',
});

const replaceProducts = productsData => ({
  //Triggered by saga to replace all existing products
  type: 'REPLACE_PROUCTS',
  productsData,
});

const appendProducts = productsData => ({
  //Triggered by saga to append to existing products
  type: 'APPEND_PROUCTS',
  productsData
});

const addAttributeFilter = filter => ({
  type: 'ADD_ATTRIBUTE_FILTER',
  filter,
});

const replaceAttributeFilter = filter => ({
  type: 'REPLACE_ATTRIBUTE_FILTER',
  filter,
});

const removeAttributeFilter = filter => ({
  type: 'REMOVE_ATTRIBUTE_FILTER',
  filter,
});

const addCategoryFilter = category => ({
  type: 'ADD_CATEGORY_FILTER',
  category,
})

const removeCategoryFilter = () => ({
  type: 'REMOVE_CATEGORY_FILTER',
})

const addSortBy = (sortBy) => ({
  type: 'ADD_SORT_BY',
  sortBy,
});

const resetSortBy = (sortBy) => ({
  type: 'RESET_SORT_BY',
  sortBy,
});

//Note: Only handeled by saga-middleware.
const loadNextPage = () => ({
  type: 'LOAD_NEXT_PAGE',
})

export default {
  loadProducts,
  loadProductsError,
  replaceProducts,
  appendProducts,
  addAttributeFilter,
  replaceAttributeFilter,
  removeAttributeFilter,
  addCategoryFilter,
  removeCategoryFilter,
  addSortBy,
  resetSortBy,
  loadNextPage,
}

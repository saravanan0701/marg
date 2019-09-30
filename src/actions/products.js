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

const removeAttributeFilter = filterId => ({
  type: 'REMOVE_ATTRIBUTE_FILTER',
  filterId,
});

const removeAllAttributeFiltersBySlug = attributeSlug => ({
  type: 'REMOVE_ALL_ATTRIBUTE_FILTERS_BY_ATTRIBUTE_SLUG',
  attributeSlug,
});

const replaceCategoryFilters = categories => ({
  type: 'REPLACE_CATEGORY_FILTERS',
  categories,
})

const addSortBy = (sortBy) => ({
  type: 'ADD_SORT_BY',
  sortBy,
});

const resetSortBy = (sortBy) => ({
  type: 'RESET_SORT_BY',
  sortBy,
});

/*Note: Only handeled by saga-middleware. Start*/
const loadNextPage = () => ({
  type: 'LOAD_NEXT_PAGE',
})
/*Note: Only handeled by saga-middleware. End*/

const addEditorFilter = editor => ({
  type: 'ADD_EDITOR_FILTER',
  editor,
});

const removeEditorFilter = editor => ({
  type: 'REMOVE_EDITOR_FILTER',
  editor,
});

const removeAllEditors = () => ({
  type: 'REMOVE_ALL_EDITOR_FILTERS',
});

const resetAllFilters = () => ({
  type: 'RESET_ALL_FILTERS',
})

export default {
  loadProductsError,
  replaceProducts,
  appendProducts,
  addAttributeFilter,
  removeAllAttributeFiltersBySlug,
  removeAttributeFilter,
  replaceCategoryFilters,
  addSortBy,
  resetSortBy,
  loadNextPage,
  addEditorFilter,
  removeEditorFilter,
  removeAllEditors,
  resetAllFilters,
}

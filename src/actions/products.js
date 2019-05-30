const loadProducts = products => ({
  type: 'LOAD_PRODUCTS',
  products
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
});

const removeCategoryFilter = () => ({
  type: 'REMOVE_CATEGORY_FILTER',
});

const addSortBy = (sortBy) => ({
  type: 'ADD_SORT_BY',
  sortBy,
});

const resetSortBy = (sortBy) => ({
  type: 'RESET_SORT_BY',
  sortBy,
});

const updatePagingData = (pagination) => ({
  type: 'UPDATE_PAGING_DATA',
  pagination,
})

export default {
  loadProducts,
  addAttributeFilter,
  replaceAttributeFilter,
  removeAttributeFilter,
  addCategoryFilter,
  removeCategoryFilter,
  addSortBy,
  resetSortBy,
  updatePagingData,
}

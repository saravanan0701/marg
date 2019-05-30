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

})

const addProductTypeFilter = productType => ({
  type: 'ADD_PRODUCT_TYPE_FILTER',
  productType,
})

const removeProductTypeFilter = () => ({
  type: 'REMOVE_PRODUCT_TYPE_FILTER',
})

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
  addProductTypeFilter,
  removeProductTypeFilter,
  addSortBy,
  resetSortBy,
  updatePagingData,
}

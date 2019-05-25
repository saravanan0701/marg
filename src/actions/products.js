const loadProducts = products => ({
  type: 'LOAD_PRODUCTS',
  products
});

const addAttributeFilter = filter => ({
  type: 'ADD_ATTRIBUTE_FILTER',
  filter,
})

const replaceAttributeFilter = filter => ({
  type: 'REPLACE_ATTRIBUTE_FILTER',
  filter,
})

const removeAttributeFilter = filter => ({
  type: 'REMOVE_ATTRIBUTE_FILTER',
  filter,
})

export default {
  loadProducts,
  addAttributeFilter,
  replaceAttributeFilter,
  removeAttributeFilter,
}

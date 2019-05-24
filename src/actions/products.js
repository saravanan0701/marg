const loadProducts = products => ({
  type: 'LOAD_PRODUCTS',
  products
});

const addFilter = filter => ({
  type: 'ADD_FILTER',
  filter,
})

const replaceFilter = filter => ({
  type: 'REPLACE_FILTER',
  filter,
})

export default {
  loadProducts,
  addFilter,
  replaceFilter,
}

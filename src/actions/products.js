const loadProducts = products => ({
  type: 'LOAD_PRODUCTS',
  products
});

const addFilter = filter => ({
  type: 'ADD_FILTER',
  filter,
})

export default {
  loadProducts,
  addFilter,
}

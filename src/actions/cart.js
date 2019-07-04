const rehyderateCartFromCache = cartItems => ({
  type: 'REHYDERATE_CART_FROM_CACHE',
  cartItems
});

const addToCart = variantDetails => ({
  type: 'ADD_TO_CART',
  variantDetails,
})


export default {
  addToCart,
}

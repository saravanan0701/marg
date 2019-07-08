const rehyderateCartFromCache = cartItems => ({
  type: 'REHYDERATE_CART_FROM_CACHE',
  cartItems
});

//saveVariant is handled by saga and inturn
// emits either initCheckout or updateCheckoutLine
const saveVariant = variantDetails => ({
  type: 'SAVE_VARIANT',
  variantDetails,
})

//persistCartFromLocalCache is triggered when a user logs in
// and we pick cart information in cache and persist it to backend.
const persistCartFromLocalCache = checkout => ({
  type: 'PERSIST_CART_FROM_CACHE',
  checkout,
})

//ADD another action to reset checkout object. 

//Initiated the checkout object.
const initCheckout = checkout => ({
  type: 'INIT_CHECKOUT',
  checkout,
})

const updateCheckoutLines = checkout => ({
  type: 'UPDATE_CHECKOUT_LINES',
  checkout,
})

const updateCartQuantity = totalQuantity => ({
  type: 'UPDATE_CART_QUANTITY',
  totalQuantity,
})

const resetCart = () => ({
  type: 'RESET_CART',
})

export default {
  saveVariant,
  initCheckout,
  updateCheckoutLines,
  updateCartQuantity,
  persistCartFromLocalCache,
  resetCart,
}
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

//Initiated the checkout object.
const initCheckout = checkout => ({
  type: 'INIT_CHECKOUT',
  checkout,
})



export default {
  saveVariant,
  initCheckout,
}

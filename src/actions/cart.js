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

const updateShippingAddress = shippingAddress => ({
  type: 'UPDATE_SHIPPING_ADDRESS',
  shippingAddress,
});

const updateShippingMethod = shippingMethod => ({
  type: 'UPDATE_SHIPPING_METHOD',
  shippingMethod,
});

const setAvailableShippingMethods = availableShippingMethods => ({
  type: 'SET_AVAILABLE_SHIPPING_METHODS',
  availableShippingMethods,
});

const setLineQuantity = (line) => ({
  type: 'SET_LINE_QUANTITY',
  line,
});

const setTotalQuantity = (totalQuantity) => ({
  type: 'SET_TOTAL_QUANTITY',
  totalQuantity,
});

const removeLineItem = (lineId) => ({
  type: 'REMOVE_LINE_ITEM',
  lineId,
})

export default {
  saveVariant,
  initCheckout,
  updateCheckoutLines,
  updateCartQuantity,
  persistCartFromLocalCache,
  resetCart,
  updateShippingAddress,
  updateShippingMethod,
  setAvailableShippingMethods,
  setLineQuantity,
  setTotalQuantity,
  removeLineItem,
}
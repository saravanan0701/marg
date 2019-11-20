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
  type: 'UPDATE_ALL_CHECKOUT_LINES',
  checkout,
})

const updateCheckoutLine = line => ({
  type: 'UPDATE_CHECKOUT_LINE',
  line,
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

const updateCartTotalPrice = (cartTotalPrice) => ({
  type: 'UPDATE_CART_TOTAL_PRICE',
  cartTotalPrice,
})

const updateCartSubTotalPrice = (cartSubTotalPrice) => ({
  type: 'UPDATE_CART_SUB_TOTAL_PRICE',
  cartSubTotalPrice,
})

const updateCartLineTotalPrice = (lineId, lineTotalPrice) => ({
  type: 'UPDATE_CART_LINE_TOTAL_PRICE',
  lineId,
  lineTotalPrice,
});

const createGuestCheckout = (checkoutDetails) => ({
  type: 'CREATE_GUEST_CHECKOUT',
  checkoutDetails,
})

const clearCartCache = () => ({
  type: "CLEAR_CART_CACHE",
})

const guestEditVariantQuantity = (variantId, quantity) => ({
  type: "GUEST_EDIT_VARIANT_QUANTITY",
  variantId,
  quantity,
})

const guestRemoveVariantQuantity = (variantId) => ({
  type: "GUEST_REMOVE_VARIANT",
  variantId,
})

const setAddressSaved = (isSaved) => ({
  type: "SET_ADDRESS_SAVED_STATUS",
  isSaved,
})

const setDiscount = (discountInfo) => ({
  type: "SET_DISCOUNT",
  discountInfo,
})

export default {
  saveVariant,
  initCheckout,
  updateCheckoutLines,
  updateCheckoutLine,
  updateCartQuantity,
  persistCartFromLocalCache,
  resetCart,
  updateShippingAddress,
  updateShippingMethod,
  setAvailableShippingMethods,
  setLineQuantity,
  setTotalQuantity,
  removeLineItem,
  updateCartTotalPrice,
  updateCartSubTotalPrice,
  updateCartLineTotalPrice,
  createGuestCheckout,
  clearCartCache,
  guestEditVariantQuantity,
  guestRemoveVariantQuantity,
  setAddressSaved,
  setDiscount
}
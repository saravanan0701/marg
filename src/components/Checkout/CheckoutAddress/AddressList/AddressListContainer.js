import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { AddressList } from './AddressList.jsx'
import actions from './../../../../actions/';

const mapStateToProps = ({
  cart: {
    checkoutId,
    shippingAddress,
    availableShippingMethods,
    shippingMethod
  },
  auth: {
    id: userId,
    addresses,
    firstName,
    lastName,
    email,
    isLoading,
  }
}, ownProps) => ({
  userId,
  checkoutId,
  addresses,
  shippingAddress,
  firstName,
  lastName,
  email,
  shippingMethod,
  availableShippingMethods,
  isLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewAddress: (address) => dispatch(actions.addNewAddress(address)),
  updateShippingAddress: (shippingAddress) => dispatch(actions.updateShippingAddress(shippingAddress)),
  setAvailableShippingMethods: (shippingMethods) => dispatch(actions.setAvailableShippingMethods(shippingMethods)),
  updateShippingMethod: (shippingMethod) => dispatch(actions.updateShippingMethod(shippingMethod)),
  updateCartTotalPrice: (cartTotalPrice) => dispatch(actions.updateCartTotalPrice(cartTotalPrice))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(AddressList));
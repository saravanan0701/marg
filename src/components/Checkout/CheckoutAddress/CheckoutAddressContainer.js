import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutAddress from './CheckoutAddress.jsx'
import actions from './../../../actions/';

const mapStateToProps = ({
  cart,
  auth: {
    id: userId,
  	firstName,
  	lastName,
  	email,
    addresses,
  }
}, ownProps) => ({
  cart,
  firstName,
  lastName,
  email,
  addresses,
  userId,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewAddress: (address) => dispatch(actions.addNewAddress(address)),
  updateShippingAddress: (shippingAddress) => dispatch(actions.updateShippingAddress(shippingAddress)),
  updateShippingMethod: (shippingMethod) => dispatch(actions.updateShippingMethod(shippingMethod)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutAddress));
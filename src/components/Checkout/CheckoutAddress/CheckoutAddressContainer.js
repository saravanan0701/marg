import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutAddress from './CheckoutAddress.jsx'
import actions from './../../../actions/';

const mapStateToProps = ({
  cart,
  auth: {
  	firstName,
  	lastName,
  	email,
  }
}, ownProps) => ({
  cart,
  firstName,
  lastName,
  email,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateShippingAddress: (shippingAddress) => dispatch(actions.updateShippingAddress(shippingAddress)),
  updateShippingMethod: (shippingMethod) => dispatch(actions.updateShippingMethod(shippingMethod)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutAddress));
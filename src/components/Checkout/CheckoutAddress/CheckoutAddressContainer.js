import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutAddress from './CheckoutAddress.jsx'
import actions from './../../../actions/';

const mapStateToProps = ({
  cart: {
    shippingAddress,
    shippingMethod
  },
}, ownProps) => ({
  shippingAddress,
  shippingMethod,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutAddress));
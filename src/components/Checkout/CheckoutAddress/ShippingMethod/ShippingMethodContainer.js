import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { ShippingMethods } from './ShippingMethods.jsx'
import actions from './../../../../actions/';

const mapStateToProps = ({
  cart: {
    checkoutId,
    shippingMethod,
    availableShippingMethods,
  },
  auth: {
    id: userId,
  }
}, ownProps) => ({
  userId,
  checkoutId,
  shippingMethod,
  availableShippingMethods,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateShippingMethod: (shippingMethod) => dispatch(actions.updateShippingMethod(shippingMethod)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ShippingMethods));
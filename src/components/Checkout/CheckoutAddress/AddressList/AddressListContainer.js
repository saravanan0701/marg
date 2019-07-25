import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { AddressList } from './AddressList.jsx'
import actions from './../../../../actions/';

const mapStateToProps = ({
  cart: {
    shippingAddress,
    availableShippingMethods,
  },
  auth: {
    id: userId,
    addresses,
    firstName,
    lastName,
    email,
  }
}, ownProps) => ({
  userId,
  addresses,
  shippingAddress,
  firstName,
  lastName,
  email,
  availableShippingMethods,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewAddress: (address) => dispatch(actions.addNewAddress(address)),
  updateShippingAddress: (shippingAddress) => dispatch(actions.updateShippingAddress(shippingAddress)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(AddressList));
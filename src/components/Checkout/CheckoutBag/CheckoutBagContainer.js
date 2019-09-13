import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutBag from './CheckoutBag.jsx';
import actions from './../../../actions/';

const mapStateToProps = ({
  cart,
  auth: {
    currency,
  }
}, ownProps) => ({
  cart,
  currency,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLineQuantity: (updatedLine) => dispatch(actions.setLineQuantity(updatedLine)),
  updateCartQuantity: (totalQuantity) => dispatch(actions.updateCartQuantity(totalQuantity)),
  removeLineItem: (lineId) => dispatch(actions.removeLineItem(lineId)),
  updateCartTotalPrice: (totalPrice) => dispatch(actions.updateCartTotalPrice(totalPrice)),
  updateCartSubTotalPrice: (subTotalPrice) => dispatch(actions.updateCartSubTotalPrice(subTotalPrice)),
  updateCartLineTotalPrice: (lineId, totalPrice) => dispatch(actions.updateCartLineTotalPrice(lineId, totalPrice)),
  guestEditVariantQuantity: (variantId, quantity) => dispatch(actions.guestEditVariantQuantity(variantId, quantity)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutBag));
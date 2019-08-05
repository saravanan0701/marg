import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutBag from './CheckoutBag.jsx';
import actions from './../../../actions/';

const mapStateToProps = ({
  cart,
}, ownProps) => ({
  cart,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLineQuantity: (updatedLine) => dispatch(actions.setLineQuantity(updatedLine)),
  updateCartQuantity: (totalQuantity) => dispatch(actions.updateCartQuantity(totalQuantity)),
  removeLineItem: (lineId) => dispatch(actions.removeLineItem(lineId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutBag));
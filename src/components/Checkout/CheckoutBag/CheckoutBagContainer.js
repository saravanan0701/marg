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
  setTotalQuantity: (totalQuantity) => dispatch(actions.setTotalQuantity(totalQuantity)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutBag));
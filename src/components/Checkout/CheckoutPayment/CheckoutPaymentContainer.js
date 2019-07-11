import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutPayment from './CheckoutPayment.jsx'
import actions from './../../../actions/';


const mapStateToProps = ({
  cart,
}, ownProps) => ({
  cart,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetCart: () => dispatch(actions.resetCart()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutPayment));
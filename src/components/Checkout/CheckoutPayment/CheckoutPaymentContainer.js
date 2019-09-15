import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutPayment from './CheckoutPayment.jsx'
import actions from './../../../actions/';
import { withRouter } from 'react-router';


const mapStateToProps = ({
  cart,
  auth: {
    email,
  }
}, ownProps) => ({
  cart,
  email,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetCart: () => dispatch(actions.resetCart()),
  clearCartCache: () => dispatch(actions.clearCartCache()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(CheckoutPayment)));
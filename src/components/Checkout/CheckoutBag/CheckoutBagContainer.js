import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutBag from './CheckoutBag.jsx'


const mapStateToProps = ({
  cart,
}, ownProps) => ({
  cart,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutBag));
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutSidebar from './CheckoutSidebar.jsx';

const mapStateToProps = ({
  cart,
  auth: {
    currency,
  },
}, ownProps) => ({
  cart,
  currency_preference: currency,
})

export default connect(
  mapStateToProps,
)(withApollo(CheckoutSidebar));
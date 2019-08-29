import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutSidebar from './CheckoutSidebar.jsx';

const mapStateToProps = ({
  cart,
}, ownProps) => ({
  cart,
})

export default connect(
  mapStateToProps,
)(withApollo(CheckoutSidebar));
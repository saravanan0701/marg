import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import CheckoutAddress from './CheckoutAddress.jsx'


const mapStateToProps = ({
  cart,
  auth: {
  	firstName,
  	lastName,
  	email,
  }
}, ownProps) => ({
  cart,
  firstName,
  lastName,
  email,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CheckoutAddress));
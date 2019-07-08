import { connect } from 'react-redux'
import Checkout from './Checkout.jsx'


const mapStateToProps = ({
  cart,
}, ownProps) => ({
  cart,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
import { connect } from 'react-redux'
import MobileHeader from './MobileHeader'


const mapStateToProps = ({
  cart: {
    totalQuantity,
  },
}, ownProps) => ({
  cartQuantity: totalQuantity,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
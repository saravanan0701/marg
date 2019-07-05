import { connect } from 'react-redux'
import Header from './Header'


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
)(Header);
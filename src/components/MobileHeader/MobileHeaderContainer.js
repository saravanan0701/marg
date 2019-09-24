import { connect } from 'react-redux'
import MobileHeader from './MobileHeader'
import actions from '../../actions';


const mapStateToProps = ({
  cart: {
    totalQuantity,
  },
  auth: {
    id,
  }
}, ownProps) => ({
  cartQuantity: totalQuantity,
  isLoggedIn: id? true: false,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: (user) => dispatch(actions.logout(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
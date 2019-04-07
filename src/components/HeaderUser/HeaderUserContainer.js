import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import actions from '../../actions';
import HeaderUser from './HeaderUser';

const mapStateToProps = ({ auth }, ownProps) => ({
  ...auth
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: (user) => dispatch(actions.logout(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (withApollo(HeaderUser))
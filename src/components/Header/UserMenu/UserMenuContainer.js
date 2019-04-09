import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import actions from '../../../actions';
import UserMenu from './UserMenu';

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
) (withApollo(withRouter(UserMenu)))
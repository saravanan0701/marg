import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../actions'
import LoginForm from './LoginForm'

const mapStateToProps = ({ auth }, ownProps) => ({
  ...auth,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginSuccess: (user) => dispatch(actions.persistAuthenticatedUser(user)),
    loginFailure: () => dispatch(actions.loginFailure()),
    errorNotification: (message) => dispatch(actions.errorNotification(message)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(LoginForm));
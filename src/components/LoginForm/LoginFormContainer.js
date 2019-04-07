import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../actions'
import LoginForm from './LoginForm'

const mapStateToProps = ({ auth }, ownProps) => ({
  ...auth,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginAttempt: (user) => dispatch(actions.loginAttempt(user)),
    loginSuccess: (user) => dispatch(actions.loginSuccess(user)),
    loginFailure: () => dispatch(actions.loginFailure()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(LoginForm));
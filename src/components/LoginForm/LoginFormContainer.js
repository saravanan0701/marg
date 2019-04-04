import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../actions'
import LoginForm from './LoginForm'

const mapStateToProps = ({loggedInUser}, ownProps) => ({
  ...loggedInUser,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginAs: (user) => dispatch(actions.loginAs(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(LoginForm));
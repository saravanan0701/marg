import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import Component from './component'

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
)(withApollo(Component));
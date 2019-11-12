import { connect } from 'react-redux'
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import actions from './../../actions'
import { Subscriptions } from './Subscriptions.jsx'


const mapStateToProps = ({
  auth: {
    id,
    currency,
    email,
    firstName,
    lastName,
    subscriptions,
  }
}, ownProps) => ({
  currency,
  email,
  firstName,
  lastName,
  isAuthenticated: id? true: false,
  subscriptions,
})

const mapDispatchToProps = (dispatch) => ({
  reloadAuthenticatedUser: () => dispatch(actions.reloadAuthenticatedUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Subscriptions)));
import { connect } from 'react-redux'
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import actions from './../../../actions'
import { SubscriptionItem } from './SubscriptionItem.jsx'


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
  successNotification: (message) => dispatch(actions.successNotification(message)),
  errorNotification: (message) => dispatch(actions.errorNotification(message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(SubscriptionItem)));
import { connect } from 'react-redux'
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import actions from './../../actions'
import { Subscriptions } from './Subscriptions.jsx'


const mapStateToProps = ({
  auth: {
    id,
    currency,
  }
}, ownProps) => ({
  currency,
  isAuthenticated: id? true: false,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Subscriptions)));
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../../actions'
import SetPassword from './SetPassword.jsx'

const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    successNotification: (message) => dispatch(actions.successNotification(message)),
    errorNotification: (message) => dispatch(actions.errorNotification(message)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(SetPassword));
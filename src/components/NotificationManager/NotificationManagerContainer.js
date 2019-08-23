import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import NotificationManager from './NotificationManager.jsx'


const mapStateToProps = ({
  notifications: {
    messages,
  } = {}
}, ownProps) => ({
  messages
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeNotification: (id) => dispatch(actions.removeNotification(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(NotificationManager));
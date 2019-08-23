import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import ForgotPasswordEmailGenerate from './ForgotPasswordEmailGenerate.jsx'


const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNotification: (message) => dispatch(actions.addNotification(message)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ForgotPasswordEmailGenerate));
import { connect } from 'react-redux'
import actions from './../../actions'
import SignupForm from './SignupForm.jsx'


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
)(SignupForm);
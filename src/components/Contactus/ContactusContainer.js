import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import Contactus from './Contactus.jsx'
import actions from './../../actions/';
import { withRouter } from 'react-router';


const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  successNotification: (message) => dispatch(actions.successNotification(message)),
  errorNotification: (message) => dispatch(actions.errorNotification(message)),  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Contactus)));
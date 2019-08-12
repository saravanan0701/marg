import { connect } from 'react-redux'
import { ProtectedRoute } from './ProtectedRoute'


const mapStateToProps = ({
	auth: {
		authToken,
		isLoading,
	}
}, ownProps) => ({
	isLoading,
	isLoggedIn: authToken? true: false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
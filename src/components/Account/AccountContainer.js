import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import Account from './Account.jsx'


const mapStateToProps = ({
	auth: {
		isLoading,
		orders,
	}
}, ownProps) => ({
	isLoading,
	orders,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Account));
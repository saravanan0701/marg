import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import AccountTabs from './AccountTabs.jsx'


const mapStateToProps = ({
	auth: {
		isLoading,
		orders,
		addresses,
		firstName,
		lastName,
		email,
		id,
		subscriptions,
	}
}, ownProps) => ({
	isLoading,
	orders,
	addresses,
	firstName,
	lastName,
	email,
	id,
	subscriptions,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	addNewAddress: (address) => dispatch(actions.addNewAddress(address)),
	updateUserName: (user) => dispatch(actions.updateUserName(user)),
	updateUserEmail: (user) => dispatch(actions.updateUserEmail(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(AccountTabs));


import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import AccountTabs from './AccountTabs.jsx'


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
)(withApollo(AccountTabs));


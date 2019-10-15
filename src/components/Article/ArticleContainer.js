import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import actions from './../../actions/'
import Article from './Article.jsx'


const mapStateToProps = ({
  auth: {
    authToken,
    isLoading,
    currency,
  }
}, ownProps) => ({
  currency,
  isLoggedIn: isLoading? false: authToken? true: false,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveVariant: (variantDetails) => dispatch(actions.saveVariant(variantDetails)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Article)));
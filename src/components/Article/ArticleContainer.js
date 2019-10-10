import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import actions from './../../actions/'
import Article from './Article.jsx'


const mapStateToProps = ({
  auth: {
    currency,
  }
}, ownProps) => ({
  currency,
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
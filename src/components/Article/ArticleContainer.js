import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import Article from './Article.jsx'


const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveVariant: (variantDetails) => dispatch(actions.saveVariant(variantDetails)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Article));
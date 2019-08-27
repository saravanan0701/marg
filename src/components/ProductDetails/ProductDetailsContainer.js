import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import ProductDetails from './ProductDetails'


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
)(withApollo(ProductDetails));
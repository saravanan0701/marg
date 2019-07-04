import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../actions/'
import ProductDetails from './ProductDetails'


const mapStateToProps = ({
}, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCart: (variantDetails) => dispatch(actions.addToCart(variantDetails)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductDetails));
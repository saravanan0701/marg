import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import ProductListWrapper from './ProductListWrapper'

const mapStateToProps = ({
  productList: {
    products,
    loadingAllProducts,
    loadingNextPage,
    loadProductsError,
  }
}, ownProps) => ({
  products,
  loadingAllProducts,
  loadingNextPage,
  loadProductsError,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadProducts: (client) => dispatch(actions.loadProducts(client)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductListWrapper));
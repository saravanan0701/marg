import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
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

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductListWrapper));
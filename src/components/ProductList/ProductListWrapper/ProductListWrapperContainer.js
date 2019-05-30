import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import ProductListWrapper from './ProductListWrapper'

const mapStateToProps = ({
  productList: {
    products,
    filter: {
      attributes,
      productType,
    },
    sortBy,
  }
}, ownProps) => ({
  products,
  attributes,
  productType,
  sortBy,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductListWrapper));
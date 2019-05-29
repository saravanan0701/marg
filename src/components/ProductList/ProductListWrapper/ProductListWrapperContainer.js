import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import ProductListWrapper from './ProductListWrapper'

const mapStateToProps = ({
  productList: {
    products,
    filter: {
      attributes,
      category,
    },
    sortBy,
  }
}, ownProps) => ({
  products,
  attributes,
  category,
  sortBy,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductListWrapper));
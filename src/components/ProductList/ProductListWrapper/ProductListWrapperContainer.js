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
    pagination,
  }
}, ownProps) => ({
  products,
  attributes,
  category,
  sortBy,
  pagination,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePagingData: (pagination) => dispatch(actions.updatePagingData(pagination)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(ProductListWrapper));
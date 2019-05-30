import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../../actions'
import { ProductTypeFilterComponent as Component } from './ProductTypeFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      productType,
    }
  }
}, ownProps) => ({
  productType,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectProductType: (productType) => dispatch(actions.addProductTypeFilter(productType)),
    removeProductType: (productType) => dispatch(actions.removeProductTypeFilter(productType)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
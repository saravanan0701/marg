import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductCategoryFilterComponent as Component } from './ProductCategoryFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      category,
    }
  }
}, ownProps) => ({
  category,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectCategory: (category) => dispatch(actions.addCategoryFilter(category)),
    removeCategory: (category) => dispatch(actions.removeCategoryFilter(category)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
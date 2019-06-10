import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../../actions'
import { CategoryFilterComponent as Component } from './CategoryFilterComponent'


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
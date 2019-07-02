import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../../actions'
import CategoryFilterComponent from './CategoryFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      categories,
    }
  }
}, ownProps) => ({
  selectedCategories: categories,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    replaceCategoryFilters: (categories) => dispatch(actions.replaceCategoryFilters(categories)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(CategoryFilterComponent));
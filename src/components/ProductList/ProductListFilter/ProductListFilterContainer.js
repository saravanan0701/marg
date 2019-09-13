import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductListFilter as Component } from './ProductListFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      attributes,
      editors,
      categories,
    }
  }
}, ownProps) => ({
  selectedAttributes: attributes,
  selectedEditors: editors,
  selectedCategories: categories,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter: (filter) => dispatch(actions.addAttributeFilter(filter)),
    removeFilter: (filterId) => dispatch(actions.removeAttributeFilter(filterId)),
    removeAllAttributeFiltersBySlug: (attributeSlug) => dispatch(actions.removeAllAttributeFiltersBySlug(attributeSlug)),
    addEditor: (editor) => dispatch(actions.addEditorFilter(editor)),
    removeEditor: (editor) => dispatch(actions.removeEditorFilter(editor)),
    removeAllEditors: () => dispatch(actions.removeAllEditors()),
    addSortBy: (sortBy) => dispatch(actions.addSortBy(sortBy)),
    resetSortBy: () => dispatch(actions.resetSortBy()),
    replaceCategoryFilters: (categories) => dispatch(actions.replaceCategoryFilters(categories)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Component)));
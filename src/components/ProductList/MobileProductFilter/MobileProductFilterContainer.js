import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import actions from '../../../actions'
import { MobileProductFilter as Component } from './MobileProductFilterComponent'


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
)(withRouter(withApollo(Component)));
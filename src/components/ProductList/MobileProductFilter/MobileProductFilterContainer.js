import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from '../../../actions'
import { MobileProductFilter as Component } from './MobileProductFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      attributes,
      editors,
    }
  }
}, ownProps) => ({
  selectedAttributes: attributes,
  selectedEditors: editors,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductListFilter as Component } from './ProductListFilterComponent'


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
    replaceFilter: (filter) => dispatch(actions.replaceAttributeFilter(filter)),
    removeFilter: (filterId) => dispatch(actions.removeAttributeFilter(filterId)),
    addEditor: (editor) => dispatch(actions.addEditorFilter(editor)),
    replaceEditor: (editor) => dispatch(actions.replaceEditorFilter(editor)),
    removeEditor: (editor) => dispatch(actions.removeEditorFilter(editor)),
    addSortBy: (sortBy) => dispatch(actions.addSortBy(sortBy)),
    resetSortBy: () => dispatch(actions.resetSortBy()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
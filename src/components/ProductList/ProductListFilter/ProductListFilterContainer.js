import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductListFilter as Component } from './ProductListFilterComponent'


const mapStateToProps = ({
  productList: {
    filter: {
      attributes,
    }
  }
}, ownProps) => ({
  attributes,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter: (filter) => dispatch(actions.addAttributeFilter(filter)),
    replaceFilter: (filter) => dispatch(actions.replaceAttributeFilter(filter)),
    removeFilter: (filter) => dispatch(actions.removeAttributeFilter(filter)),
    addSortBy: (sortBy) => dispatch(actions.addSortBy(sortBy)),
    resetSortBy: () => dispatch(actions.resetSortBy()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
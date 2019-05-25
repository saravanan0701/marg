import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductListFilter as Component } from './ProductListFilterComponent'


const mapStateToProps = ({ productList: { filters } }, ownProps) => ({
  filters,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter: (filter) => dispatch(actions.addFilter(filter)),
    replaceFilter: (filter) => dispatch(actions.replaceFilter(filter)),
    removeFilter: (filter) => dispatch(actions.removeFilter(filter)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
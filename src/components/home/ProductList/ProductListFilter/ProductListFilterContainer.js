import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../../actions/'
import { ProductListFilter as Component } from './ProductListFilterComponent'


const mapStateToProps = ({ productList: { filters } }, ownProps) => ({
  filters,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
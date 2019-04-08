import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import Component from './ProductListComponent'

const mapStateToProps = ({productList: { products, filters } }, ownProps) => ({
  products,
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
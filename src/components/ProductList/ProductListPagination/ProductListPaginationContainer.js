import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../actions/'
import { ProductListPaginationComponent as Component } from './ProductListPaginationComponent'


const mapStateToProps = ({
  productList: {
    pagination: {
      hasNextPage,
    },
  }
}, ownProps) => ({
  hasNextPage,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadNextPage: (filter) => dispatch(actions.loadNextPage()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import actions from './../../../../actions/'
import Component from './ProductListFilterComponent'

const mapStateToProps = ({ productsList: { filters } }, ownProps) => ({
  ...filters,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  //   loginAs: (user) => dispatch(actions.loginAs(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(Component));